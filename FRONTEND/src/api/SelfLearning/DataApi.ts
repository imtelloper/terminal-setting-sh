export default class DataApi {
//   async slaiGetDataModelCount(data) {
//     try {
//       const res = await fetch(Baseapi.pythonWebAPI + 'SLAIGetDataModelCount/');
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async saveFile(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveFile/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       // openClashModal("파일 저장에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async slaiDataMakeModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SLAIDataMakeModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       $(".wrongData").removeClass("block_div");
//     }
//   }
//
//   async slaiDataSelectModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SLAIDataSelectModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("AI 테스트에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async slaiDataSendReport(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SLAIDataSendReport/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       $(".MakeReport").addClass("block_div");
//       $(".ReportError").removeClass("block_div");
//     }
//   }
//
//   async upgradeVersionData(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'UpgradeVersionData/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async saveDataModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveDataModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal("모델 저장에 실패했습니다. 재시도해주세요.");
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
//       openClashModal("모델 다운로드에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async choiceDataModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'ChoiceDataModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async slDataMakeModelBG(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SLDataMakeModelBG/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   ///////////////////////////////////////////////
//
//   async saveResultFile(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveResultFile/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
}
