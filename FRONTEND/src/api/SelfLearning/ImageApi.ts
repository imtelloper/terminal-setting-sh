export default class ImageApi {
//   async checkAllLabelInfo(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'CheckAllLabelInfo/?foldername=' + data.foldername);
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       // openClashModal2();
//     }
//   }
//
//   async saveImages(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveImages/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? 'success' : "fail";
//     } catch (error) {
//       console.error('error', error);
//       // openClashModal2("이미지 저장에 실패하였습니다.");
//     }
//   }
//
//   async step2AddImages(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'Step2AddImages/', {
//         method: 'POST',
//         body: formData
//       });
//       const failData = { 'fail': data.addImgId }
//       return res.status === 200 ? 'success' : failData;
//     } catch (error) {
//       console.error('error', error);
//       // openClashModal("이미지 추가에 실패하였습니다.");
//       // $("#" + data.addImgId).parent().remove();
//     }
//   }
//
//   async step2ChangeClassName(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'Step2ChangeClassName/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? 'success' : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal("클래스명 변경에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async saveTestImgsForImage(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveTestImages/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? 'success' : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal("테스트 이미지 저장에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async saveBlobImages(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveBlobImages/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("이미지 저장에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async setDefaultClassName(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SetDefaultClassName/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async getSelectOption(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'GetSelectOption/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async selectOption(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SelectOption/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async saveStep2BlobImages(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveStep2BlobImages/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("이미지 저장에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async getAutoCropImagesTestV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'GetAutoCropImagesTestV2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("이미지 저장에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async saveCropImagesV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveCropImagesV2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("이미지 저장에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async getAutoCropImagesStep2V2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'GetAutoCropImagesStep2V2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("이미지 저장에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async getAutoCropImagesV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'GetAutoCropImagesV2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("이미지 저장에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async saveBlobImagesSupervised(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveBlobImagesSupervised/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("이미지 저장에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async insertImagesInfo(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'InsertImagesInfo/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("AI 학습에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async slaiGetImageModelCount() {
//     try {
//       const res = await fetch(Baseapi.pythonWebAPI + 'SLAIGetImageModelCount/');
//       return res.json()
//     } catch (error) {
//       console.error('error', error);
//     }
//   }
//
//   async choiceModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'ChoiceModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("모델 불러오기를 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async slaiTrainV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SLAITrainV2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("이미지 자동분류에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async getAcc(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'GetAcc/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal("이미지 테스트에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async step2UpdateClassV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'Step2UpdateClassV2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("이미지 이동에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async deleteImagesDBV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'DeleteImagesDBV2/', {
//         method: 'POST',
//
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       openClashModal2("이미지 삭제에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   //async step2DeleteClassV2(data) {
//   //  try {
//   //    const formData = new FormData();
//   //    Object.keys(data).forEach(key => formData.append(key, data[key]));
//   //    const res = await fetch(Baseapi.pythonWebAPI + 'Step2DeleteClassV2/', {
//   //      method: 'POST',
//   //      body: formData
//   //    });
//   //    return res.status === 200 ? res.json() : "fail";
//   //  } catch (error) {
//   //    console.error('error', error);
//   //    openClashModal2("클래스 삭제에 실패했습니다. 재시도해주세요.");
//   //  }
//   //}
//
//   async slaiTuneV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SLAITuneV2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       // $(".ai_character_run").addClass("block_div");
//       // $(".ai_character_die").removeClass("block_div");
//     }
//   }
//
//   async slaiInferenceV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SLAIInferenceV2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       console.error('error', error);
//       // openClashModal2("AI 테스트에 실패했습니다. 재시도해주세요.");
//     }
//   }
//
//   async saveTestBlobImages(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveTestBlobImages/', {
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
//   async cropSendReportV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'CropSendReportV2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       $(".MakeReport").addClass("block_div");
//       $(".error_report").parent().removeClass("block_div");
//       $(".error_report").parent().css("z-index", 999);
//     }
//   }
//
//   async sendReportV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SendReportV2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       $(".MakeReport").addClass("block_div");
//       $(".error_report").parent().removeClass("block_div");
//       $(".error_report").parent().css("z-index", 999);
//     }
//   }
//
//   async step2AddClassV2(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'Step2AddClassV2/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       let step2Class = $("#addClassBox").children("div.box");
//       openClashModal("클래스 추가에 실패했습니다. 재시도해주세요.");
//       step2Class.eq(step2Class.length - 1).remove();
//     }
//   }
//
//   async addRebackImages(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'AddRebackImages/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       let step2Class = $("#addClassBox").children("div.box");
//       openClashModal("재분류 이미지 저장에 실패했습니다. 재시도해주세요.");
//       step2Class.eq(step2Class.length - 1).remove();
//     }
//   }
//
//   async upgradeVersion(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'UpgradeVersion/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       openClashModal2();
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
//       let step2Class = $("#addClassBox").children("div.box");
//       openClashModal("모델 다운로드에 실패했습니다. 재시도해주세요.");
//       step2Class.eq(step2Class.length - 1).remove();
//     }
//   }
//
//   async saveModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'SaveModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       let step2Class = $("#addClassBox").children("div.box");
//       openClashModal("모델 저장에 실패했습니다. 재시도해주세요.");
//       step2Class.eq(step2Class.length - 1).remove();
//     }
//   }
//
//   async backgroundModelTrain(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'BackgroundModelTrain/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       let step2Class = $("#addClassBox").children("div.box");
//       openClashModal2("백그라운드 모델 생성에 실패했습니다. 재시도해주세요.");
//       step2Class.eq(step2Class.length - 1).remove();
//     }
//   }
//
//   async backgroundModelTune(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'BackgroundModelTune/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       let step2Class = $("#addClassBox").children("div.box");
//       openClashModal2("백그라운드 모델 생성에 실패했습니다. 재시도해주세요.");
//       step2Class.eq(step2Class.length - 1).remove();
//     }
//   }
//
//   async choiceBackgroundImageModel(data) {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => formData.append(key, data[key]));
//       const res = await fetch(Baseapi.pythonWebAPI + 'ChoiceBackgroundImageModel/', {
//         method: 'POST',
//         body: formData
//       });
//       return res.status === 200 ? res.json() : "fail";
//     } catch (error) {
//       let step2Class = $("#addClassBox").children("div.box");
//       openClashModal2("모델 호출에 실패했습니다. 재시도해주세요.");
//       step2Class.eq(step2Class.length - 1).remove();
//     }
//   }
}
