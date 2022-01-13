import api from "@/api";

export default class SignupRequest {
  constructor(body) {
    this.body = body;
  }

  async send() {
    const response = await api.post("/user", this.body);

    return response;
  }
}
