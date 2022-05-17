export default class ModelManagementApi {
//   async showImageModelList(data) {
//     try {
//       const res = await fetch(Baseapi.pythonWebAPI + `ShowImageModelList/?email=${data}`);
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async showBackgroundModelTrainingList(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'ShowBackgroundModelTrainingList/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async showDataModelList(data) {
//     try {
//       const res = await fetch(Baseapi.pythonWebAPI + `ShowDataModelList/?email=${data}`);
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async downloadModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'DownloadModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async downloadDataModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'DownloadDataModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async getShareList(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'GetShareList/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async isCorrectEmail(data) {
//     try {
//       const res = await fetch(Baseapi.pythonWebAPI + `IsCorrectEmail/?email=${data}`);
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async shareModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'ShareModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async deleteSavedModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'DeleteSavedModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async changeModelName(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'ChangeModelName/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
}
