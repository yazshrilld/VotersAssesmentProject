import React, { useEffect, useState, useRef } from "react";
import ReactSelect from "react-select";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Fade from "react-reveal/Fade";
import ProgressBar from "../components/ProgressBar";
import { Titles, Gender, MaritalValue, Countries } from "../utils";
import FileUploadComponent from "../components/FIleUpload";
import Terms from "../components/terms";
import Selfie from "../components/selfie";
import PDFIcon from "../assets/pdf-svg.svg";
import benefit from "../assets/benefits_icon.png";
import Loader from "../components/loading";


import {
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import DatePicker from "../components/DatePicker/DatePicker";
import { ArrowRight, Camera } from "react-bootstrap-icons";
import { set } from "date-fns";

const Doc = ({ setForm, formData, navigation, loading }) => {
    
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const Identity = [
    { name: "DL", value: "Driver's License" },
    { name: "IP", value: "International Passport" },
    { name: "NIN", value: "National Identification Number" },
    { name: "VC", value: "Voters Card" },
  ];

  const INITIAL_DL_VALUE = {
    driversLicenseNumber: "",
    issueDate: new Date(),
    expirationDate: new Date(),
  };

  const INITIAL_IP_VALUE = {
    passportNumber: "",
    expirationDate: new Date(),
  };

  const INITIAL_NIN_VALUE = {
    nationalIdentificationNumber: "",
  };

  const INITIAL_VC_VALUE = {
    votersCardNumber: "",
  };
  const { previous, next, go } = navigation;

  const [agreementCheckBox, setAgreementCheckBox] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [identityInfo, setIdentityInfo] = useState(null);
  const [allDataValid, setAllDataValid] = useState(false);
  const [clickDriversLicense, setClickDriversLicense] = useState(false);
  const [validationError, setValidationErrors] = useState({});

  const [passportInfo, setPassportInfo] = useState(null);
  // console.log("passport:", passportInfo);
  const [utilityInfo, setUtilityInfo] = useState(null);
  const [signatureInfo, setSignatureInfo] = useState(null);
  const [referenceInfo, setReferenceInfo] = useState(null);
  const [votersCardLoading, setVotersCardLoading] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);


  const [dlInfoPhoto, setDlInfoPhoto] = useState(null);
  const [ipInfoPhoto, setIpInfoPhoto] = useState(null);
  const [ninInfoPhoto, setNinInfoPhoto] = useState(null);
  const [vcInfoPhoto, setVcInfoPhoto] = useState(null);

  const [showTerm, setShowTerm] = useState(false);
  const [showSelfie, setShowSelfie] = useState(false);

  const [selfieImg, setSelfieImg] = useState(null);
  const [idError, setIdError] = useState({})


  const [rmCode, setRmCode] = useState("");
  const [motherMaidenName, setmotherMaidenName] = useState("");
  const [utilityDate, setUtilitydate] = useState("");

  const [clickCardIdentify, setClickCardIdentify] = useState(false);
  const [clickInternationalPassport, setClickInternationalPassport] =
    useState(false);
  const [clickVotersCard, setClickVotersCard] = useState(false);
  const [clickNinNumber, setClickNinNumber] = useState(false);
  const [dlValue, setDlValue] = useState(INITIAL_DL_VALUE);
  const [ipValue, setIpValue] = useState(INITIAL_IP_VALUE);
  const [ninValue, setNinValue] = useState(INITIAL_NIN_VALUE);
  const [vcValue, setVcValue] = useState(INITIAL_VC_VALUE);
  const [selected, setSelected] = useState(Identity[0].name);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dob, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [state, setState] = useState("");
  const [lga, setLGA] = useState("");
  const [address, setAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bvn, setBVN] = useState("");

  const API_URL = process.env.REACT_APP_BaseApi_URL
  const API_URL_You = process.env.REACT_APP_Base_URLYou


  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("res"));
    // let data = verifyToken(localStorage.getItem("res"));

    const dbUserTitle = data?.Gender === "Male" ? "MR" :data?.Gender === "Female"? "MRS": ""
    setFirstName(data?.FirstName);
    setLastName(data?.LastName);
    setMiddleName(data?.MiddleName);
    setDOB(data?.DOB);
    setPhone(data?.Phone);
    setEmail(data?.Email);
    setTitle(
      data?.Title == undefined || data?.Title == null || data?.Title == ""
        ? dbUserTitle
        : data.Title
    );
    setGender(data?.Gender);
    setState(data?.State);
    setLGA(data?.LGA);
    setAddress(data?.Address);
    setMaritalStatus(data?.MaritalStatus);
    setBVN(data?.BVN);
    // setFirstName(data.FirstName);
    // setLastName(data.LastName);
    // setMiddleName(data.MiddleName);
    // setDOB(data.DateOfBirth);
    // setPhone(data.PhoneNumber1);
    // setEmail(data.Email);
    // setTitle(data.Title);
    // setGender(data.Gender);
    // setState(data.StateOfOrigin);
    // setLGA(data.LgaOfOrigin);
    // setAddress(data.ResidentialAddress);
    // setMaritalStatus(data.MaritalStatus);
    // setBVN(data.BVN);
  }, []);

  const utilityInfoStatus = utilityInfo?.status;
  const passportInfoStatus = passportInfo?.status;
  const signatureInfoStatus = signatureInfo?.status;
  const identityInfoStatus = identityInfo?.status;
  const dlInfoPhotoStatus = dlInfoPhoto?.status;
  const ipInfoPhotoStatus = ipInfoPhoto?.status;
  const ninInfoPhotoStatus = ninInfoPhoto?.status;
  const vcInfoPhotoStatus = vcInfoPhoto?.status;
  const referenceInfoStatus = referenceInfo?.status;
  console.log()
  //   useEffect(() => {
  //     const nextContinue =
  //       identityInfoStatus == "done" && agreementCheckBox ? true : false;
  //     setAllDataValid(nextContinue);
  //   }, [identityInfoStatus]);
// console.log("referenceInfoStatus:",referenceInfo?.status)


  useEffect(() => {
    if(
      utilityDate !== "" &&
      utilityInfoStatus === "done" &&
      passportInfoStatus === "done" &&
      signatureInfoStatus === "done" &&
      agreementCheckBox ? true : false &&
      (
        vcInfoPhotoStatus === "done" || 
        dlInfoPhotoStatus === "done" ||
        ipInfoPhotoStatus === "done" ||
        ninInfoPhotoStatus === "done"
      ) ||
      referenceInfo?.status === "done"
    ) {
      setAllDataValid(true)
    }
    else {
      setAllDataValid(false)
    }
  }, [
    utilityInfoStatus,
    passportInfoStatus,
    signatureInfoStatus,
    identityInfoStatus,
    dlInfoPhotoStatus,
    ipInfoPhotoStatus,
    ninInfoPhotoStatus,
    vcInfoPhotoStatus,
    referenceInfoStatus,
    agreementCheckBox,
  ]);
  console.log(utilityInfoStatus,
    passportInfoStatus,
    signatureInfoStatus,
    identityInfoStatus,
    dlInfoPhotoStatus,
    ipInfoPhotoStatus,
    ninInfoPhotoStatus,
    vcInfoPhotoStatus,
    referenceInfoStatus,
    agreementCheckBox,)

//   const customerBasicInfo = {
//     accountType: 'accountType',
//     lastName: 'lastname',
//     firstName: 'firstName',
//     middleName: 'middleName',
//     address: 'address',
//     address2: 'address',
//     religion: 'religion',
//     phone: 'phone',
//     dob: 'dob',
//     email: 'email',
//     bvn: 'bvn',
//     state: 'state',
//     lga: 'lga',
//     country: 'country',
//     altPhone: 'altPhone',
//     altEmail: 'altEmail',
//     currentAddress: 'currentAddress',
//     branch: 'branch',
//     rmCode: 'rmCode',
//     docutilityDate: 'docutilityDate',
//     occupation: 'occupation',
//     motherMaidenName: 'motherMaidenName',
//     amount : 'amount',
//     cardType : 'cardType',
//     // new_cust_id
//     new_cust_id : localStorage.getItem('customerid')
// }

const customerDataInfo = JSON.parse(sessionStorage.getItem("body"))
let data = JSON.parse(sessionStorage.getItem("res"));


var body = sessionStorage.getItem('body');
        var entire = JSON.parse(body)
//  console.log(entire); 
// console.log(data?.Gender)
// console.log(customerDataInfo?.account)

// const payload = {
//   yazid: customerDataInfo.state,
// }
// console.log(payload.yazid)

  const handleClose = () => {
    setShowTerm(false);
  };
  const handleCloseSelfie = () => {
    setShowSelfie(false);
  };

  const handleCardIdentity = (e) => {
    const result = e.target.value;
    const { name } = e.target;
    // console.log(name, result)

    if (result === "DL") {
      setClickDriversLicense(true);
    } else if (result === "IP") {
      setClickInternationalPassport(true);
    } else if (result === "VC") {
      setClickVotersCard(true);
    } else if (result === "NIN") {
      setClickNinNumber(true);
    }
  };

  const handleDlChange = (e) => {
    if ([e.target.name === "driversLicenseNumber"]) {
      const updateDLValue = {
        ...dlValue,
        driversLicenseNumber: e.target.value,
      };
      setDlValue(updateDLValue);
      console.log("updatedDlValue: ", updateDLValue)
      console.log(dlValue)
    }
  };

  const validateDl = async () => {
    setSubmitting(true)
    const body = {
      DriverLicense_number:"AAA00000AA00",
      bvn:"22272840498"
    }
    // console.log(dlValue.driversLicenseNumber)
    try {
      const response = await axios.post (API_URL + "/verifyDriverlicense", body)
      if( response.data.status.toLowerCase() === "true" ) {
        console.log("response:", "Driver's License validation was a success.")
        console.log("response:",response)
      } else {
        
        console.log("Wrong credentials provided by user")
      }
    } catch (error) {
        console.log(error)
    } finally {
      setSubmitting(false)
    }
  }


  const validateNin = async () => {
    setSubmitting(true)
    const body = {
      NIN_number:"YV111111111111FY",
      bvn:"22272840498"
    }
    // console.log(dlValue.driversLicenseNumber)
    try {
      const response = await axios.post (API_URL + "/verifyNIN", body)
      if( response.data.status.toLowerCase() === "true" ) {
        console.log("response:", "NIN validation was a success.")
        console.log("response:",response)
      } else {
        
        console.log("Wrong credentials provided by user")
      }
    } catch (error) {
        // setSubmitting(false)
        console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  const validateVc = async () => {
    setSubmitting(true)
    const body = {
      PVC_number:"00A0A0A000000000000",
      bvn: "22272840498"
    }
    // console.log(dlValue.driversLicenseNumber)
    try {
      const response = await axios.post (API_URL + "/verifyPVC", body)
      console.log(response)
      if( response.data.status.toLowerCase() === "true" ) {
        console.log("response:", "Voters Card validation was a success.")
        console.log("response:",response)
      } else {
        setError("Wrong int'l passport credentials provided, please check what you are provided")
        console.log("Wrong credentials provided by user")
      }

    } catch (error) {
         // setSubmitting(false)
         console.log(error)         
    } finally {
      setSubmitting(false)
    }
  }

  const handleIpChange = (e) => {
    if ([e.target.name === "passportNumber"]) {
      const updateIpValue = { ...ipValue, passportNumber: e.target.value };
      setIpValue(updateIpValue);
      // console.log(updateIpValue)

    }
  };
  console.log(customerDataInfo.lastName)

  const validateIp = async () => {
    setSubmitting(true)
    const body = {
      passport_number:"A11111111",
      lastName: "Doe",
      bvn:"22272840498"
    }
    try {
      const response = await axios.post (API_URL + "/verifyPassport", body)
      if( response.data.status.toLowerCase() === "true" ) {
        console.log("response:", "Passport validation was a success.")
        console.log("response:",response)
      } else {
        
        console.log("Wrong credentials provided by user")
      }
    } catch (error) {
        setSubmitting(false)
    } finally {
      setSubmitting(false)
    }
  }

  const handleNinChange = (e) => {
    if ([e.target.name === "nationalIdentificationNumber"]) {
      const updateNinValue = {
        ...ninValue,
        nationalIdentificationNumber: e.target.value,
      };
      setNinValue(updateNinValue);
      // console.log(updateNinValue)
    }
  };

  const handleVcChange = (e) => {
    if ([e.target.name === "votersCardNumber"]) {
      const updateVcValue = { ...vcValue, votersCardNumber: e.target.value };
      setVcValue(updateVcValue);
      // console.log(updateVcValue)
    }
  };

  const handleExDateChange = (value) => {
    const exDateValue = { ...dlValue, expirationDate: value };
    setDlValue(exDateValue);
  };

  const handleIsDateChange = (value) => {
    const issueDateValue = { ...dlValue, issueDate: value };
    setDlValue(issueDateValue);
  };

  const handleIpDateChange = (value) => {
    const ipDateValue = { ...ipValue, expirationDate: value };
    setIpValue(ipDateValue);
  };

  const setDlValuesToEmpty = () => {
    setDlValue({
      driversLicenseNumber: "",
      issueDate: "",
      expirationDate: "", 
    });
    setDlInfoPhoto(null)
  }

  const setNinValuesToEmpty = () => {
    setNinValue({
      nationalIdentificationNumber: "" ,
    });
    setNinInfoPhoto(null)
  }

  const setIpValuesToEmpty = () => {
    setIpValue({
      passportNumber: "",
      expirationDate: "",  
    });
    setIpInfoPhoto(null)
  }

  const setVcValuesToEmpty = () => {
    setVcValue({
      votersCardNumber: "",  
    });
    setVcInfoPhoto(null)
  }


  const disableddate = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  const SubmitSelfie = (selfieImg) => {
    setSelfieImg(selfieImg);
  };

  const trimStr = (str) => {
    if (str != null && str != undefined) {
      return str.trim();
    }
    return "";
  };

  const onSubmit = async () => {
    setShowTerm(false);
    console.log("I am Clicked")
    // if (!action) return;
    try {
      console.log(localStorage.getItem("basicInfo"));
        // const body = JSON.parse(localStorage.getItem("basicInfo"))
        // console.log(body)
      try {
        topRef.current.scrollIntoView({ behavior: "smooth" });
      } catch (er) {}
      if (!agreementCheckBox) {
        setError(" Kindly check terms & conditions to proceed");
        setSubmitting(false);
        loading(false);
        return;
      } 
      else if (
        utilityDate === "" 
      ) {
        // setValidationErrors({
        //   identity: "Identity file size cannot be greater than 5MB",
        // });
        setError("Fill in your utility date");
        setSubmitting(false);
        loading(false);
        return;
      }else if (
        passportInfo != null &&
        passportInfo.status == "error_file_size"
      ) {
        setValidationErrors({
          passport: "Image size cannot be greater than 5MB",
        });
        setError("Image size cannot be greater than 5MB");
        setSubmitting(false);
        loading(false);
        return;
      } else if (passportInfo != null && passportInfo.status !== "done") {
        setValidationErrors({ passport: "Image not properly uploaded" });
        setError("Image not properly uploaded");
        setSubmitting(false);
        loading(false);
        return;
      } else if (
        identityInfo != null &&
        identityInfo.status == "error_file_size"
      ) {
        setValidationErrors({
          identity: "Identity file size cannot be greater than 5MB",
        });
        setError("Identity file size cannot be greater than 5MB");
        setSubmitting(false);
        loading(false);
        return;
      } else if (
        dlInfoPhoto != null &&
        dlInfoPhoto.status == "error_file_size"
      ) {
        setValidationErrors({
          driver: "Driver's License file size cannot be greater than 5MB",
        });
        setError("Driver's License file size cannot be greater than 5MB");
        setSubmitting(false);
        loading(false);
        return;
      } else if (
        ipInfoPhoto != null &&
        ipInfoPhoto.status == "error_file_size"
      ) {
        setValidationErrors({
          intrenationalPassport: "International Passport file size cannot be greater than 5MB",
        });
        setError("International Passport file size cannot be greater than 5MB");
        setSubmitting(false);
        loading(false);
        return;
      } else if (
        ninInfoPhoto != null &&
        ninInfoPhoto.status == "error_file_size"
      ) {
        setValidationErrors({
          nin: "nin file size cannot be greater than 5MB",
        });
        setError("nin file size cannot be greater than 5MB");
        setSubmitting(false);
        loading(false);
        return;
      } else if (
        vcInfoPhoto != null &&
        vcInfoPhoto.status == "error_file_size"
      ) {
        setValidationErrors({
          voters: "voter's card file size cannot be greater than 5MB",
        });
        setError("voter's card file size cannot be greater than 5MB");
        setSubmitting(false);
        loading(false);
        return;
      }
        else if (identityInfo != null && identityInfo.status !== "done") {
        setValidationErrors({
          identity: "Identity file not properly uploaded",
        });
        setError("Identity file not properly uploaded");
        setSubmitting(false);
        loading(false);
        return;
      } else if (dlInfoPhoto != null && dlInfoPhoto.status !== "done") {
        setValidationErrors({
          driver: "Driver's License file not properly uploaded",
        });
        setError("Driver's License file not properly uploaded");
        setSubmitting(false);
        loading(false);
        return;
      } else if (ipInfoPhoto != null && ipInfoPhoto.status !== "done") {
        setValidationErrors({
          internationalPassport: "International Passport file not properly uploaded",
        });
        setError("International Passport file not properly uploaded");
        setSubmitting(false);
        loading(false);
        return;
      } else if (ninInfoPhoto != null && ninInfoPhoto.status !== "done") {
        setValidationErrors({
          nin: "nin file not properly uploaded",
        });
        setError("nin file not properly uploaded");
        setSubmitting(false);
        loading(false);
        return;
      } else if (vcInfoPhoto != null && vcInfoPhoto.status !== "done") {
        setValidationErrors({
          voters: "Voter's Card file not properly uploaded",
        });
        setError("Voter's Card file not properly uploaded");
        setSubmitting(false);
        loading(false);
        return;
      }
       else if (
        utilityInfo != null &&
        utilityInfo.status == "error_file_size"
      ) {
        setValidationErrors({
          utility: "Utility file size cannot be greater than 5MB",
        });
        setError("Utility file size cannot be greater than 5MB");
        setSubmitting(false);
        loading(false);
        return;
      } else if (utilityInfo != null && utilityInfo.status !== "done") {
        setValidationErrors({ 
          utility: "Utility file not properly uploaded" 
        });
        setError("Utility file not properly uploaded");
        setSubmitting(false);
        loading(false);
        return;
      } else if (
        signatureInfo != null &&
        signatureInfo.status == "error_file_size"
      ) {
        setValidationErrors({
          signature: "Signature file size cannot be greater than 5MB",
        });
        setError("Signature file size cannot be greater than 5MB");
        setSubmitting(false);
        loading(false);
        return;
      } else if (signatureInfo != null && signatureInfo.status !== "done") {
        setValidationErrors({
          signature: "Signature file not properly uploaded",
        });
        setError("Signature file not properly uploaded");
        setSubmitting(false);
        loading(false);
        return;
      } else if (
        referenceInfo != null &&
        referenceInfo.status == "error_file_size"
      ) {
        setValidationErrors({
          reference: "Reference file size cannot be greater than 5MB",
        });
        setError("Reference file size cannot be greater than 5MB");
        setSubmitting(false);
        loading(false);
        return;
      } else if (referenceInfo != null && referenceInfo.status !== "done") {
        setValidationErrors({
          reference: "Reference file not properly uploaded",
        });
        setError("Reference file not properly uploaded");
        setSubmitting(false);
        loading(false);
        return;
      }

      const formData = new FormData();

      if (passportInfo != null) {
        formData.append(
          "passport",
          passportInfo.file,
          passportInfo.file.name +
            "---__" +
            trimStr(firstName) +
            "_" +
            trimStr(middleName) +
            "_" +
            trimStr(lastName)
        );
        console.log("passportInfo field is not empty")
      }
      if (utilityInfo != null) {
        formData.append(
          "utility",
          utilityInfo.file,
          utilityInfo.file.name +
            "---__" +
            trimStr(firstName) +
            "_" +
            trimStr(middleName) +
            "_" +
            trimStr(lastName)
        );
        console.log("utilityInfo field is not empty")
      }
      if (identityInfo != null) {
        formData.append(
          "identity",
          identityInfo.file,
          identityInfo.file.name +
            "---__" +
            trimStr(firstName) +
            "_" +
            trimStr(middleName) +
            "_" +
            trimStr(lastName)
        );
        console.log("identityInfo field is not empty")
      }
      if (dlInfoPhoto != null) {
        formData.append(
          "identity",
          dlInfoPhoto.file,
          dlInfoPhoto.file.name +
            "---__" +
            trimStr(firstName) +
            "_" +
            trimStr(middleName) +
            "_" +
            trimStr(lastName)
        );
        console.log("dlInfoPhoto field is not empty")

      }
      if (ipInfoPhoto != null) {
        formData.append(
          "identity",
          ipInfoPhoto.file,
          ipInfoPhoto.file.name +
            "---__" +
            trimStr(firstName) +
            "_" +
            trimStr(middleName) +
            "_" +
            trimStr(lastName)
        );
      }
      if (ninInfoPhoto != null) {
        formData.append(
          "identity",
          ninInfoPhoto.file,
          ninInfoPhoto.file.name +
            "---__" +
            trimStr(firstName) +
            "_" +
            trimStr(middleName) +
            "_" +
            trimStr(lastName)
        );
      }
      if (vcInfoPhoto != null) {
        formData.append(
          "identity",
          vcInfoPhoto.file,
          vcInfoPhoto.file.name +
            "---__" +
            trimStr(firstName) +
            "_" +
            trimStr(middleName) +
            "_" +
            trimStr(lastName)
        );
      }
      if (signatureInfo != null) {
        formData.append(
          "signature",
          signatureInfo.file,
          signatureInfo.file.name +
            "---__" +
            trimStr(firstName) +
            "_" +
            trimStr(middleName) +
            "_" +
            trimStr(lastName)
        );
      }
      if (referenceInfo != null) {
        formData.append(
          "reference",
          referenceInfo.file,
          referenceInfo.file.name +
            "---__" +
            trimStr(firstName) +
            "_" +
            trimStr(middleName) +
            "_" +
            trimStr(lastName)
        );
      }

      // formData.append("data", JSON.parse(body));
      // console.log("bodyFromFormData: ", body)
      // formData.append("data", JSON.parse(localStorage.getItem("body")));


      formData.append("utilityDate" , utilityDate)
      let data = JSON.stringify(entire)
      // console.log(data);
      formData.append("data", data);

      // for(var pair of formData.entries()){

      //     console.log(pair[0] + ", " + pair[1]);
          
      //   }
      
      // console.log(...formData)





      setSubmitting(true)


      try{
      const response = await axios.post( API_URL + "/account/ops/individual_account_api",
        formData,
        { timeout: 180000 }
      );
      // "https://providusonline.providusbank.com:8443/api/account/ops/individual_account_api",

      if (response.data.ResponseCode === "00") {
        setSubmitting(false);
        loading(false);
       
        await sessionStorage.setItem("deetsTitle", entire.title);
        await sessionStorage.setItem("deets", JSON.stringify(response.data));
        go("success");
      } else {
        setSubmitting(false);
        loading(false);
        setError(response.data.ResponseDetInfo);
      }
    } catch (error) {
      setSubmitting(false);
      loading(false);
      try {
        setValidationErrors(error.response.data);
      } catch (er) {
        setValidationErrors({
          error: error.message,
        });
      }
    }
    // finally{
    //   setSubmitting(false)
    //   go("success");
    // }

      
      // const response = await axios.post( API_URL + "/account/ops/individual_account_api",
      //   formData,
      //   { timeout: 180000 }
      // );
      // // "https://providusonline.providusbank.com:8443/api/account/ops/individual_account_api",

      // if (response.data.ResponseCode === "00") {
      //   setSubmitting(false);
      //   loading(false);

      //   await localStorage.setItem("deetsTitle", title);
      //   await localStorage.setItem("deets", JSON.stringify(response.data));
      //   // go("success");
      // } else {
      //   setSubmitting(false);
      //   loading(false);
      //   setError(response.data.ResponseDetInfo);
      // }
    } 
    
    catch (error) {
      setSubmitting(false);
      loading(false);
      try {
        setValidationErrors(error.response.data);
      } catch (er) {
        setValidationErrors({
          error: error.message,
        });
      }
    }
  };

  return (
    <div>
      
      <ProgressBar page="doc" />
      <Fade bottom>
        <form id="msform">
          <fieldset>
          <h2 className="fs-title" ref={topRef}>
            DOCUMENT INFORMATION
          </h2>
          <h3 className="fs-subtitle text-danger">
            Fields marked with <sup>*</sup> are mandatory
          </h3>
          <p className="text-danger">
            {error != null && error != "" ? error : validationError.error}
          </p>
          <hr />
          <div className="row">
                  <div className="col-md-6">
                      <div className="form-group">

                      <label
                            htmlFor="exampleFormControlTextarea1"
                             className={
                            utilityInfoStatus == "done" ? "" : "text-danger"
                            
                             }
                             >
                                Utility Bill (PDF)
                          <sup className="text-danger">*</sup>
                         </label>
                        <FileUploadComponent
                             setFileInfo={setUtilityInfo}
                             fineInfo={utilityInfo}
                             type="Utility"
                              disabled={false}
                             path=""
                    // setValidationErrors={setValidationErrors}
                            />
                             <p className="text-danger">{validationError.utility}</p>
                        </div>
                  </div>
                  <div className="col-md-6">
                      <div className="form-group">
                      <label
                            htmlFor="exampleFormControlTextarea1"
                             className={
                              utilityDate === "" ? "text-danger" : ""
                            
                             }
                             >
                                Utility Date
                          <sup className="text-danger">*</sup>
                         </label>
                           <input
                            type = "date"
                            value = { utilityDate }
                            onChange= {(e)=>setUtilitydate(e.target.value)}
                            className= "border bg-white w-100 date-picker"
                            max= {disableddate()}
                            // min = {allowOnlyThreeMonthBack()}
                           />

                          
                        </div>

                  </div>
                  
                  
                
                  <div className="row">
                
              </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className={
                        passportInfoStatus == "done" ? "" : "text-danger"
                      }
                    >
                      Passport Photo (JPEG, JPG, PNG)
                      <sup className="text-danger">*</sup>
                    </label>
                    <FileUploadComponent
                      setFileInfo={setPassportInfo}
                      fineInfo={passportInfo}
                      type="Passport"
                      disabled={false}
                      path=""
                      // setValidationErrors={setValidationErrors}
                    />
                    {/* <Camera /> */}
                    <p className="text-danger">{validationError.passport}</p>
                  </div>
                </div>

                {/* <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className={
                        identityInfoStatus == "done" ? "" : "text-danger"
                      }
                    >
                      Means of Identification (PDF,JPEG, JPG, PNG)
                      <sup className="text-danger">*</sup>
                    </label>
                    <FileUploadComponent
                      setFileInfo={setIdentityInfo}
                      fineInfo={identityInfo}
                      type="Identification"
                      disabled={false}
                      path=""
                      // setValidationErrors={setValidationErrors}
                    />
                    <p className="text-danger">{validationError.identity}</p>
                  </div>
                </div> */}

                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      // className={religion != "" ? "" : "text-danger"}
                      htmlFor="exampleFormControlTextarea1"
                    >
                      ID Card Identification{" "}
                      <sup className="text-danger">*</sup>
                    </label>
                    <select
                      className="form-control select3"
                      id="exampleFormControlSelect2"
                      name="identity"
                      // value={selected}
                      // onChange={(e) => setSelected(e.target.value)}
                      onChange={handleCardIdentity}
                    >
                      <option value="">
                        Select Your Means Of Identification
                      </option>
                      {Identity.map((identify) => (
                        <option key={identify.name} value={identify.name}>
                          {identify.value}
                        </option>
                      ))}
                    </select>
                    {/* <FileUploadComponent
                      setFileInfo={setReferenceInfo}
                      fineInfo={referenceInfo}
                      path=""
                      disabled={accountType != "40"}
                      type="Reference"
                      // setValidationErrors={setValidationErrors}
                    /> */}
                    {/* <p className="text-danger">{validationError.reference}</p> */}
                  </div>
                </div>

                <div className="col-md-6 ">
                  <div className="form-group">
                    <label
                       
                      htmlFor="exampleFormControlTextarea1"
                      className={
                        signatureInfoStatus == "done" ? "" : "text-danger"
                      }
                    >
                      Signature (PDF,JPEG,JPG, PNG)
                      <sup className="text-danger">*</sup>
                    </label>
                    <FileUploadComponent
                      setFileInfo={setSignatureInfo}
                      fineInfo={signatureInfo}
                      type="Signature"
                      disabled={false}
                      path=""
                      // setValidationErrors={setValidationErrors}
                    />
                    {/* <Camera size={30}/> */}
                    <p className="text-danger">{validationError.signature}</p>
                  </div>
                </div>

                <Dialog
                  open={clickDriversLicense}
                  onClose={() => setClickDriversLicense(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle>Driver's License</DialogTitle>
                  <DialogContent>
                    <div className="mx-2">
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": {
                            m: 1, 
                            width: {
                              xs: '29ch',
                              sm: '44ch',
                              md: '44ch',
                              xl: '60ch',
                              lg: '60ch',
                            },
                          },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <TextField
                            label="Driers License Number"
                            name="driversLicenseNumber"
                            value={dlValue.driversLicenseNumber}
                            onChange={handleDlChange}
                          />
                        </div>
                        <div className="form-group mx-2">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className={
                              dlInfoPhotoStatus == "done" ? "" : "text-danger"
                            }
                          >
                            Driver's License (JPEG, JPG, PNG)
                            <sup className="text-danger">*</sup>
                          </label>
                          <FileUploadComponent
                            setFileInfo={setDlInfoPhoto}
                            fineInfo={dlInfoPhoto}
                            type="Passport"
                            disabled={false}
                            path=""
                            classname={{ height: "80px", color: "purple", opacity:"0" }}
                            // setValidationErrors={setValidationErrors}
                          />
                          {
                            // console.log("dlInfoPhoto:", dlInfoPhoto)
                          }
                          {/* <Camera /> */}
                          <p className="text-danger">
                            {validationError.driver}
                          </p>
                        </div>
                      </Box>
                    </div>
                  </DialogContent>
                  <DialogActions sx={{ p: 3 }}>
                    <Button
                      onClick={() => {
                        setClickDriversLicense(false);
                        setDlValue({
                          driversLicenseNumber: "",
                          issueDate: "",
                          expirationDate: "",
                        });
                        setDlInfoPhoto(null)
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={() => {
                        setClickDriversLicense(false);
                        setDlValue(dlValue);
                        setIpValuesToEmpty()
                        setVcValuesToEmpty()
                        setNinValuesToEmpty()
                        validateDl()
                      }}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={clickInternationalPassport}
                  onClose={() => setClickInternationalPassport(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle>International Passport</DialogTitle>
                  <DialogContent>
                    <div className="mx-2">
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "60ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <TextField
                            label="Passport Number"
                            name="passportNumber"
                            value={ipValue.passportNumber}
                            onChange={handleIpChange}
                          />
                        </div>

                        <div className="form-group mx-2">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className={
                              ipInfoPhotoStatus == "done" ? "" : "text-danger"
                            }
                          >
                            Inernational Passport (JPEG, JPG, PNG)
                            <sup className="text-danger">*</sup>
                          </label>
                          <FileUploadComponent
                            setFileInfo={setIpInfoPhoto}
                            fineInfo={ipInfoPhoto}
                            type="Passport"
                            disabled={false}
                            path=""
                            classname={{ height: "40px", color: "green" }}
                            // setValidationErrors={setValidationErrors}
                          />
                          {/* <Camera /> */}
                          <p className="text-danger">
                            {validationError.internationalPassport}
                          </p>
                        </div>
                      </Box>
                    </div>
                  </DialogContent>
                  <DialogActions sx={{ p: 3 }}>
                    <Button
                      onClick={() => {
                        setClickInternationalPassport(false);
                        setIpValue({
                          passportNumber: "",
                          expirationDate: "",
                        });
                        setIpInfoPhoto(null)
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={() => {
                        setClickInternationalPassport(false);
                        setIpValue(ipValue);
                        setDlValuesToEmpty()
                        setVcValuesToEmpty()
                        setNinValuesToEmpty()
                        validateIp()
                      }}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={clickVotersCard}
                  onClose={() => setClickVotersCard(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle>Voters Card</DialogTitle>
                  <DialogContent>
                    <div className="mx-2">
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "60ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <TextField
                            label="Voter's Card Number"
                            name="votersCardNumber"
                            // value={}
                            value={vcValue.votersCardNumber}
                            onChange={handleVcChange}
                          />
                        </div>
                        {error && (
                            <div className="d-flex align-center">
                              <p className="text-danger">{error}</p>
                            </div>
                          )
                        }

                        <div className="form-group mx-2">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className={
                              vcInfoPhotoStatus == "done" ? "" : "text-danger"
                            }
                          >
                            Voter's Card (JPEG, JPG, PNG)
                            <sup className="text-danger">*</sup>
                          </label>
                          <FileUploadComponent
                            setFileInfo={setVcInfoPhoto}
                            fineInfo={vcInfoPhoto}
                            type="Passport"
                            disabled={false}
                            path=""
                            classname={{ height: "40px", color: "green" }}
                            // setValidationErrors={setValidationErrors}
                          />
                          {/* <Camera /> */}
                          <p className="text-danger">
                            {validationError.voters}
                          </p>
                        </div>
                      </Box>
                    </div>
                  </DialogContent>
                  <DialogActions sx={{ p: 3 }}>
                    <Button
                      onClick={() => {
                        setClickVotersCard(false);
                        setVcValue({
                          votersCardNumber: "",
                        });
                        setVcInfoPhoto(null)
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={() => {
                        setClickVotersCard(false);
                        setVcValue(vcValue);
                        setDlValuesToEmpty()
                        setIpValuesToEmpty()
                        setNinValuesToEmpty()
                        validateVc()
                      }}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={clickNinNumber}
                  onClose={() => setClickNinNumber(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle>National Identification Number</DialogTitle>
                  <DialogContent>
                    <div className="mx-2">
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "60ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <TextField
                            label="National Identification Number"
                            name="nationalIdentificationNumber"
                            
                            onChange={handleNinChange}
                          />
                        </div>

                        <div className="form-group mx-2">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className={
                              ninInfoPhotoStatus == "done" ? "" : "text-danger"
                            }
                          >
                            NIN (JPEG, JPG, PNG)
                            <sup className="text-danger">*</sup>
                          </label>
                          <FileUploadComponent
                            setFileInfo={setNinInfoPhoto}
                            fineInfo={ninInfoPhoto}
                            type="Passport"
                            disabled={false}
                            path=""
                            classname={{ height: "40px", color: "green" }}
                            // setValidationErrors={setValidationErrors}
                          />
                          {/* <Camera /> */}
                          <p className="text-danger">
                            {validationError.nin}
                          </p>
                        </div>
                      </Box>
                    </div>
                  </DialogContent>
                  <DialogActions sx={{ p: 3 }}>
                    <Button
                      onClick={() => {
                        setClickNinNumber(false);
                        setNinValue({
                          nationalIdentificationNumber: "",
                        });
                        setNinInfoPhoto(null)
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={() => {
                        setClickNinNumber(false);
                        setNinValue(ninValue);
                        setDlValuesToEmpty()
                        setIpValuesToEmpty()
                        setNinValuesToEmpty()
                        validateNin()
                      }}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>

                
                { 
                customerDataInfo.accountType !== "65" && 
                  <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1"
                      className={
                        referenceInfoStatus == "done" ? "" : "text-danger"
                      }
                    >
                      Reference (PDF,JPEG, JPG, PNG)
                    </label>
                    <FileUploadComponent
                      setFileInfo={setReferenceInfo}
                      fineInfo={referenceInfo}
                      path=""
                      type="Reference"
                      // setValidationErrors={setValidationErrors}
                    />
                    <p className="text-danger">{validationError.reference}</p>
                  </div>
                </div>
                }
              </div>
              <p>
                <input
                  style={{ marginRight: "5px" }}
                  type="checkbox"
                  required={true}
                  checked={agreementCheckBox}
                  onChange={() => setAgreementCheckBox(!agreementCheckBox)}
                />
                I Agree to the
                <a
                  href="#"
                  onClick={() => setShowTerm(true)}
                  style={{ color: "#efb331" }}
                >
                  {" "}
                  Terms & Conditions
                </a>
              </p>
              
       {!allDataValid ? (
                     <>
                <input
                    type="button"
                    name="previous"
                    className="previous action-button"
                    value="Previous"
                    onClick={previous}
                  />
             </>
             ) :!submitting ?  (
              
                <>
            
                  <input
                  type="button"
                   name="submit"
                  className={
                    allDataValid ? "next action-button" : " disabled-button"
                  }
                  value="Submit"
                  // onClick={onSubmit}
                disabled={!allDataValid}
                onClick={onSubmit}
                  // onClick={() => setShowTerm(true)}
                />    
              </>         
     ):
           <>
                <input
                  type="button"
                  name="next"
                  className="btn next action-button"
                  value="Processing..."
                  disabled
                />
             </>

      } 
<>

                 {/* <input
                    type="button"
                    name="previous"
                    className="previous action-button"
                    value="Previous"
                    onClick={previous}
                  /> */}
                  {/* <input
                    type="button"
                    name="submit"
                    className={
                      allDataValid ? "next action-button" : " disabled-button"
                    }
                    value="Submit"
                    // onClick={onSubmit}
                    disabled = {!allDataValid}
                    onClick={onSubmit}
                    // onClick={() => setShowTerm(true)}
                  /> */}
                </>
                
                {/* <input
                  type="button"
                  name="submit"
                  className="btn next action-button"
                  value="Processing..."
                  disabled
                /> */}


              <div className="d-flex align-items-center"
                ref={bottomRef}
                // ref={(el) => {
                //   bottomRef = el;
                // }}
              >
                <p className="text-danger align-self-center">
                  {error != null && error != "" ? error : validationError.error}
                </p>
              </div>
              <label>
                <b>
                  {" "}
                  <a
                    href="https://oap.providusbank.com/providus_files/reference-form.pdf"
                    target="_blank"
                    style={{ textDecoration: "none", color: "#efb331" }}
                  >
                    {" "}
                    Download Reference{" "}
                    <img
                      className="mr-2"
                      src={PDFIcon}
                      alt="reference"
                      width="25"
                    />
                  </a>
                </b>
              </label>

          </fieldset>
        </form>
        <br />
      </Fade>
      {
       submitting ? (
        <Loader/>

       ): null
      }

      <Terms showTerm={showTerm} handleClose={handleClose} />
      <Selfie
        showSelfie={showSelfie}
        handleClose={handleCloseSelfie}
        SubmitSelfie={SubmitSelfie}
      />
    </div>
    
  );
};
export default Doc;