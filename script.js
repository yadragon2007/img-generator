const OPENAI_API_KEY = "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";
const promptR = document.getElementById("prompt");
const state = document.getElementById("state");
const count = 5;

const creat = async () => {
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
  console.log(img_json);
  //done
  if (img_json.error != null) {
    if (img_json.error.code == "content_policy_violation") {
      state.innerHTML = `أحترم نفسك يا وسخ`;
      state.style.color = `red`;
    } else {
      state.innerHTML = `failed`;
      state.style.color = `red`;
    }
  } else {
    state.innerHTML = `failed`;
    state.style.color = `aliceblue`;
  }
  //change img src
  const imgOutPut = document.querySelector("img");
  imgOutPut.src = img_json.data[0].url;
};
