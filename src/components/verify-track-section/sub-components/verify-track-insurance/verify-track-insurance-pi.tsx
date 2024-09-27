import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useContext, useReducer, useState } from "react";
import React from "react";

import { createVerifyTrackInsurance } from "@/api/verify-track-insurance";
import { Button, InputFile } from "@/components";
import { InsuranceIcon, AlaramIcon } from "@/components";
import InputText from "@/components/common/input-text";
import { VerifyTrackInsuranceForm } from "@/interface";

import { VerifyTrackContext } from "../../../../context/verify-track-context";
import { STEPS } from "../verify-track-loan/verify-track-loan-steps-enum";

interface VerifyTrackInsurancePiProps {
  setCurrentStep: (currentStep: number) => void;
}

interface VerifyTrackInsuranceFormAction {
  type: string;
  payload?: string | VerifyTrackInsuranceForm | File;
}

const initialState: VerifyTrackInsuranceForm = {
  userid: 0,
  phname: "",
  phemail: "",
  phcontactno: "",
  phaddress: "",
  phcity: "",
  phpincode: "",
  phdob: "",
  phanniv: "",
  phpan: "",
  uid: "",
  purstore: "",
  invno: "",
  invdate: "",
  invval: "",
  panfile: "",
  imgurl: "",
};

const VerifyTrackInsuranceFormReducer = (
  state: VerifyTrackInsuranceForm,
  action: VerifyTrackInsuranceFormAction
) => {
  if (action.type === "ALL") {
    return {
      ...state,
      ...(action.payload as unknown as VerifyTrackInsuranceForm),
    };
  }
  return { ...state, [action.type]: action.payload };
};

const VerifyTrackInsurancePi: React.FC<VerifyTrackInsurancePiProps> = ({
  setCurrentStep,
}) => {
  const [state, dispatch] = useReducer(
    VerifyTrackInsuranceFormReducer,
    initialState
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [open, setOpen] = React.useState(false); //dialogbox

  const { productDetails, setInsuranceReceiptNumber } =
    useContext(VerifyTrackContext);

  if (!productDetails) return null;

  const onChangeHandlerCreator = (fieldname: string) => {
    if (["invfile"].includes(fieldname)) {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          type: fieldname,
          payload: (e.target as HTMLInputElement)?.files?.[0],
        });
    }

    return (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: fieldname,
        payload: (e.target as HTMLInputElement).value,
      });
    };
  };

  const handleOpen = () => setOpen(!open); //dialog

  const handleClick = () => {
    //setOpen(!open);

    const validationErrors: { [key: string]: string } = {};

    if (!state.phname) {
      validationErrors.phname = "Name is required";
    }

    if (!state.phemail) {
      validationErrors.phemail = "Email is ";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(state.phemail)
    ) {
      validationErrors.phemail = "Invalid email";
    }

    if (!state.phcontactno) {
      validationErrors.phcontactno = "Mobile number is required";
    }

    if (!state.phaddress) {
      validationErrors.phaddress = "Address is required";
    }

    if (!state.phpincode) {
      validationErrors.phpincode = "Pin code is required";
    }

    if (!state.phdob) {
      validationErrors.phdob = "Date of Birth is required";
    }

    if (!state.phcity) {
      validationErrors.phcity = "City is required";
    }

    if (!state.invno) {
      validationErrors.invno = "Invoice number is required";
    }

    if (!state.invval) {
      validationErrors.invval = "Invoice value is required";
    }

    if (!state.invdate) {
      validationErrors.invdate = "Invoice date is required";
    }

    // if (!state.purstore) {
    //   validationErrors.purstore = "Jeweller Name is required";
    // }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload: VerifyTrackInsuranceForm = {
      ...state,
      phname: state.phname,
      phemail: state.phemail,
      phcontactno: state.phcontactno,
      phaddress: state.phaddress,
      phpincode: state.phpincode,
      phdob: new Date(state.phdob || Date.now()).toISOString(),
      //phanniv: new Date(state.phanniv || Date.now()).toISOString(),
      phpan: state.phpan,
      uid: productDetails.uid,
      purstore: state.purstore,
      invno: state.invno,
      invdate: new Date(state.invdate || Date.now()).toISOString(),
      invval: state.invval,
    };
    //console.log(payload);
    createVerifyTrackInsurance(payload)
      .then((res) => {
        console.log("It is successfully created", res);
        setInsuranceReceiptNumber(res.data.requestno);
        setCurrentStep(STEPS.THREE);
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <div>
      <div className="w-full">
        <div>
          <div className="text-white bg-Chinese-Black-sidebar p-2.5">{`UID : ${productDetails.uid}`}</div>
          <div className="bg-Chinese-Black-sidebar flex justify-center items-center text-center [&>svg]:w-30 [&>svg]:h-38">
            <InsuranceIcon className="" />
          </div>
          <div className="text-white bg-Chinese-Black-sidebar p-2.5"></div>
        </div>
        <div className="mt-10 px-3">
          <div className="mt-2.5 font-montserrat not-italic font-medium text-xl leading-6 text-gray-900">
            Personal Information
          </div>
          <div className="flex mt-2.5 gap-4 flex-col">
            <InputText
              label="Name *"
              type="text"
              value={state.phname}
              onChange={onChangeHandlerCreator("phname")}
              className={`w-full ${errors.phname ? "" : "border-red-500"}`}
              errorText={errors.phname}
              containerClass="!mb-0"
            />
            <InputText
              label="E-Mail Id *"
              type="email"
              value={state.phemail}
              onChange={onChangeHandlerCreator("phemail")}
              className={`w-full ${errors.phemail ? "border-red-500" : ""}`}
              containerClass="!mb-0"
              errorText={errors.phemail}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />

            <InputText
              label="Mobile No. *"
              type="number"
              value={state.phcontactno}
              onChange={onChangeHandlerCreator("phcontactno")}
              className={`w-full ${errors.phcontactno ? "border-red-500" : ""}`}
              containerClass="!mb-0"
              errorText={errors.phcontactno}
            />
            <InputText
              label="Address *"
              type="text"
              value={state.phaddress}
              onChange={onChangeHandlerCreator("phaddress")}
              className={`w-full ${errors.phaddress ? "border-red-500" : ""}`}
              containerClass="!mb-0"
              errorText={errors.phaddress}
            />

            <InputText
              label="City *"
              type="text"
              value={state.phcity}
              onChange={onChangeHandlerCreator("phcity")}
              className={`w-full ${errors.phcity ? "border-red-500" : ""}`}
              containerClass="!mb-0"
              errorText={errors.phcity}
            />

            <InputText
              label="Pin Code *"
              type="number"
              value={state.phpincode}
              onChange={onChangeHandlerCreator("phpincode")}
              className={`w-full ${errors.phpincode ? "border-red-500" : ""}`}
              containerClass="!mb-0"
              errorText={errors.phpincode}
            />

            <InputText
              label="Date of Birth *"
              type="date"
              value={state.phdob}
              onChange={onChangeHandlerCreator("phdob")}
              className={`w-full ${errors.phdob ? "border-red-500" : ""}`}
              containerClass="!mb-0"
              errorText={errors.phdob}
            />

            {/* <InputText
              label="Anniversary Date*"
              type="date"
              value={state.phanniv}
              onChange={onChangeHandlerCreator("phanniv")}
              className={`w-full ${errors.phanniv ? "border-red-500" : ""}`}
              containerClass="!mb-0"
              errorText={state.phanniv}
            />

            <InputText
              label="Pan Number *"
              type="text"
              value={state.phpan}
              onChange={onChangeHandlerCreator("phpan")}
              className={`w-full ${errors.phpan ? "border-red-500" : ""}`}
              containerClass="!mb-0"
              errorText={errors.phpan}
            /> */}
          </div>
        </div>
      </div>
      <div className="mt-10 px-3">
        <div className="mt-2.5 font-montserrat not-italic font-medium text-xl leading-6 text-gray-900">
          Product Information
        </div>
        <div className="flex flex-col gap-4 mt-2.5">
          <InputText
            label="UID *"
            type="text"
            value={productDetails.uid}
            onChange={onChangeHandlerCreator("uid")}
            className={`w-full ${errors.uid ? "border-red-500" : ""}`}
            containerClass="!mb-0"
            errorText={errors.uid}
          />
          <InputText
            label="Jeweller Name"
            type="text"
            value={productDetails.purchase_from}
            onChange={onChangeHandlerCreator("purstore")}
            className={`w-full ${errors.purstore ? "border-red-500" : ""}`}
            containerClass="!mb-0"
            errorText={errors.purstore}
          />
          <InputText
            label="Invoice Number *"
            type="text"
            value={state.invno}
            onChange={onChangeHandlerCreator("invno")}
            className={`w-full ${errors.invno ? "border-red-500" : ""}`}
            containerClass="!mb-0"
            errorText={errors.invno}
          />

          <InputText
            label="Invoice Date *"
            type="date"
            value={state.invdate}
            onChange={onChangeHandlerCreator("invdate")}
            className={`w-full ${errors.invdate ? "border-red-500" : ""}`}
            errorText={errors.invdate}
            containerClass="!mb-0"
          />

          <InputText
            label="Invoice Value *"
            type="text"
            value={state.invval}
            onChange={onChangeHandlerCreator("invval")}
            className={`w-full ${errors.invval ? "border-red-500" : ""}`}
            errorText={errors.invval}
            containerClass="!mb-0"
          />

          <div className="mt-2.5 justify-between">
            <InputFile
              label=""
              onChange={onChangeHandlerCreator("invfile")}
              value={state.panfile}
              placeholder="Upload Document"
            />
          </div>
        </div>
        <div className="flex mt-2.5"></div>
      </div>
      <div className="flex justify-between gap-1 mt-14 px-3">
        <Button
          themeType="light"
          classes="w-6/12 text-base leading-5 font-medium"
        >
          CANCEL
        </Button>
        <Button
          themeType="dark"
          classes="w-6/12 text-base leading-5 font-medium"
          onClick={handleClick}
        >
          SUBMIT
        </Button>
      </div>
      <>
        <Dialog open={open} handler={handleClick}>
          <DialogHeader>
            <Typography variant="h5" color="blue-gray">
              <AlaramIcon />
              Reminder:
            </Typography>
          </DialogHeader>
          <DialogBody divider className="grid place-items-center gap-4">
            <Typography className="text-center font-normal">
              Verify your Invoice Number, Date, and Amount. Please verify all
              information before proceeding.
            </Typography>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button themeType="light" variant="text" onClick={handleOpen}>
              Edit
            </Button>
            <Button themeType="dark" variant="gradient" onClick={handleOpen}>
              Okay
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </div>
  );
};

export default VerifyTrackInsurancePi;
