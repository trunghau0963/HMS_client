import axios from "axios";

export const onLogOut = async (toast: any, dispatch: any, setCredentials: any, navigate: any) => {
    try {
      const respone = await axios.get("/api/auth/logout");
      console.log("Logout success", respone);
      toast({
        variant: "success",
        title: "Success.",
        description: "Logout successful",
      });
      dispatch(setCredentials({ user: null, accessToken: null }));
      navigate.push("/sign-in");
    } catch (error: any) {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "Error.",
        description: error.message,
      });
    }
  }
