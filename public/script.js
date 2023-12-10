//the input text
const promptR = document.getElementById("prompt");
// <p> that send the state
const state = document.getElementById("state");

//generation function
const creat = async () => {
  //loading
  state.innerHTML = `loading...`;
  state.style.color = `aliceblue`;
  //-----------------------------------------------//
  //get OPENAI_API_KEY
  getKey().then(async (OPENAI_API_KEY) => {
    //get img
    const img = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: promptR.value,
        n: 1,
        size: "1024x1024",
      }),
    });
    //change outPut to json format
    const img_json = await img.json();
    console.log(img_json)
    //done
    if (img_json.error != null) {
      err(img_json.error.code);
    } else {
      state.innerHTML = `I love you mira`;
      state.style.color = `aliceblue`;
      //change img src
      const imgOutPut = document.querySelector("img");
      imgOutPut.src = img_json.data[0].url;
    }
  });
};




//get OPENAI_API_KEY
const getKey = async () => {
  const getData = await fetch("/get/key/", {
    method: "POST",
  });
  const OPENAI_API_KEY = await getData.json();
  return OPENAI_API_KEY;
};






// handle errors
function err(errorCode) {
  if (errorCode == "content_policy_violation") {
    state.innerHTML = `أحترم نفسك يا وسخ`;
    state.style.color = `red`;
  } else {
    state.innerHTML = `failed`;
    state.style.color = `red`;
  }
}

//short cuts
document.onkeyup = (e) => {
  if (e.code == "Enter") {
    creat();
  }
};
