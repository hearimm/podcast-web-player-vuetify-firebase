import * as functions from "firebase-functions";
const cors = require("cors")({ origin: true });
import axios from "axios";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const itunesSearch = functions.https.onRequest(
  async (request, response) => {
    // tslint:disable-next-line:no-empty
    cors(request, response, async () => {
      try {
        const axiosResponse = await axios.get(
          encodeURI(
            `https://itunes.apple.com/search?term=${
              request.query.search
            }&entity=podcast&country=KR`
          )
        );
        response.send(axiosResponse.data.results);
      } catch (error) {
        console.log(error);
        response.status(500).send(error);
      }
    });
  }
);

export const itunesLookup = functions.https.onRequest(
  async (request, response) => {
    // tslint:disable-next-line:no-empty
    cors(request, response, async () => {
      try {
        const axiosResponse = await axios.get(
          `https://itunes.apple.com/lookup?id=
          ${request.query.id}
          &entity=podcast&country=KR`
        );
        const lookupData = axiosResponse.data.results[0];
        response.send(lookupData);
      } catch (error) {
        console.log(error);
        response.status(500).send(error);
      }
    });
  }
);

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    // tslint:disable-next-line:no-empty
    const baseUrl = "https://itunes.apple.com/";
    const uri = baseUrl + `lookup?id=807339352&entity=podcast&country=KR`;
    cors(request, response, async () => {
      try {
        const axiosResponse = await axios.get(uri);
        const lookupData = axiosResponse.data.results[0];
        response.send(lookupData);
      } catch (error) {
        console.log(error);
        response.status(500).send(error);
      }
    });
  }
);

export const google = functions.https.onRequest(async (request, response) => {
  const baseUrl = "https://google.com/";
  cors(request, response, async () => {
    try {
      const axiosResponse = await axios.get(baseUrl);
      console.log(axiosResponse.data);
      response.send(axiosResponse.data);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  });
});

export const apple = functions.https.onRequest(async (request, response) => {
  const baseUrl = "https://itunes.apple.com/";
  cors(request, response, async () => {
    try {
      const axiosResponse = await axios.get(baseUrl);
      console.log(axiosResponse.data);
      response.send(axiosResponse.data);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  });
});

export const print = functions.https.onRequest(async (request, response) => {
  response.send("이거는 되냐 ㅅㅂ?");
});
