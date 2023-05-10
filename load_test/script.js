import http from 'k6/http';

export default function () {
  const url = 'http://localhost:8080/submit';
  const payload = JSON.stringify({
    sourceCode: "print('Hello')",
    stdin: "",
    language: "py"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}