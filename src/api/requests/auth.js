import api from "@/api";

export default class AuthRequest {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async send() {
    const response = await api.post("/auth/token", {
      email: this.username,
      password: this.password,
    });

    return response;
  }
}
