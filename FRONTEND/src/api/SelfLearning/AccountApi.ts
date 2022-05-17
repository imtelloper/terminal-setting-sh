export default class AccountApi {
  // async signUp(data) {
  //   try {
  //     const res = await fetch(Baseapi.pythonWebAPI + `SignUp/?email=${data}`);
  //     return res.status === 200 ? res.json() : "fail";
  //   } catch (error) {
  //     console.error('error', error);
  //     openClashModal2();
  //   }
  // }
  //
  // async beforeSignIn(data) {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach(key => formData.append(key, data[key]));
  //     const res = await fetch(Baseapi.pythonWebAPI + 'BeforeSignIn/', {
  //       method: 'POST',
  //       body: formData
  //     });
  //     return res.status === 200 ? res.json() : "fail";
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }
  //
  // async signIn(data) {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach(key => formData.append(key, data[key]));
  //     const res = await fetch(Baseapi.pythonWebAPI + 'SignIn/', {
  //       method: 'POST',
  //       body: formData
  //     });
  //     return res.status === 200 ? res.json() : "fail";
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }
  //
  // async checkConnection(data) {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach(key => formData.append(key, data[key]));
  //     const res = await fetch(Baseapi.pythonWebAPI + 'CheckConnection/', {
  //       method: 'POST',
  //       body: formData
  //     });
  //     return res.status === 200 ? res.json() : "fail";
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }
  //
  // async signOut(data) {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach(key => formData.append(key, data[key]));
  //     const res = await fetch(Baseapi.pythonWebAPI + 'SignOut/', {
  //       method: 'POST',
  //       body: formData
  //     });
  //     return res.status === 200 ? res.json() : "fail";
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }
  //
  // async resetPassword(data) {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach(key => formData.append(key, data[key]));
  //     const res = await fetch(Baseapi.pythonWebAPI + 'ResetPassword/', {
  //       method: 'POST',
  //       body: formData
  //     });
  //     return res.status === 200 ? res.json() : "fail";
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }
  //
  // async forgotPassword(data) {
  //   try {
  //     const res = await fetch(Baseapi.pythonWebAPI + `ForgotPassword/?email=${data}`);
  //     return res.status === 200 ? res.json() : "fail";
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }
  //
  // async getMyInfo(data) {
  //   try {
  //     const res = await fetch(Baseapi.pythonWebAPI + `GetMyInfo/?email=${data}`);
  //     return res.status === 200 ? res.json() : "fail";
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }
  //
  // async saveMemberShipPlan(data) {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach(key => formData.append(key, data[key]));
  //     const res = await fetch(Baseapi.pythonWebAPI + 'SaveMemberShipPlan/', {
  //       method: 'POST',
  //       body: formData
  //     });
  //     return res.status === 200 ? res.json() : "fail";
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }
  //
  // async saveMemberShipDataPlan(data) {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach(key => formData.append(key, data[key]));
  //     const res = await fetch(Baseapi.pythonWebAPI + 'SaveMemberShipDataPlan/', {
  //       method: 'POST',
  //       body: formData
  //     });
  //     return res.status === 200 ? res.json() : "fail";
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }
}
