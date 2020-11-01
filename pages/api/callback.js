import auth0 from "../../utils/auth0";
import axiosClient from "../../lib/apiproxy/axiosClient";
import { CHECK_USER_EXISTENCE } from "../../lib/apiproxy/mutations";

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        try {
          const dbUserRecordResponse = await axiosClient.PostQuery(
            CHECK_USER_EXISTENCE,
            {  user: {
                  firstName: session.user.given_name,
                  lastName: session.user.family_name,
                  email: session.user.email,
                  userName: session.user.nickname,
                  socialLoginId: session.user.sub,
                  socialProfilePicUrl: session.user.picture,
                }
            }
          );

          let userId = null;
          if (dbUserRecordResponse.data.data.checkUserExistence != null) {
            userId = dbUserRecordResponse.data.data.checkUserExistence.id;
          } else {
            userId = null;
          }
          return {
            ...session,
            user: {
              ...session.user,
              userId: userId,
            },
          };
        } catch (err) {
          console.log(err);
        }
      },
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
