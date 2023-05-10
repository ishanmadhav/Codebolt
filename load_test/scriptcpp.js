import http from 'k6/http';

export default function () {
  const url = 'http://localhost:8080/submit';
  const payload = JSON.stringify({
    sourceCode: "#include <iostream>\r\nusing namespace std;\r\n\r\nint main(){\r\n    cout<<\"Deletion demo\"<<endl;\r\n}",
    stdin: "",
    language: "cpp"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}