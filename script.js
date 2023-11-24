const OPENAI_API_KEY = "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";
const promptR = document.getElementById('prompt');
const state = document.getElementById('state')
const count = 5;

const creat = async () => {
  //loading
  state.innerHTML = `loading...`
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
  //change img src
  const imgOutPut = document.querySelector('img')
  imgOutPut.src = img_json.data[0].url;
  //done
  state.innerHTML = `done`
};
