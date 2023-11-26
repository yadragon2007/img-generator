const promptR = document.getElementById("prompt");
const state = document.getElementById("state");
const OPENAI_API_KEY = document.querySelector('.generate').id


//generation function
const creat = async (OPENAI_API_KEY) => {
  //loading
  state.innerHTML = `loading...`;
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
  //change outPut to json
  const img_json = await img.json();
  //done
  if (img_json.error != null) {
    err(img_json.error.code)
  } else {
    state.innerHTML = `done`;
    state.style.color = `aliceblue`;
    //change img src
    const imgOutPut = document.querySelector("img");
    imgOutPut.src = img_json.data[0].url;
  }
};

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
  if (e.code == 'Enter') {
    creat(OPENAI_API_KEY)
  }
};
