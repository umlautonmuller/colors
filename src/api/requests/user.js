import api from "@/api";

export default class UserDataRequest {
  constructor(token) {
    this.token = token;
  }

  async send() {
    const response = await api.get("/user/data", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return response;
  }
}
