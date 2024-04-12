import createRefresh from "react-auth-kit/createRefresh";
import axios from "axios";

const refresh = createRefresh({
  interval: 10, // The time in sec to refresh the Access token,
  refreshApiCallback: async (param) => {
    try {
      const response = await axios.post("/api/users/refresh-token", {
        body: JSON.stringify({
          refreshToken: param.refreshToken,
        }),
      });
      console.log("Refreshing");
      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: "",
        newAuthTokenExpireIn: 0,
        newRefreshTokenExpiresIn: 0,
      };
    }
  },
});

export default refresh;
