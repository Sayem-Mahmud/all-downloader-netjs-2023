import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import Loader from "../Loader/Loader";
import styles from "./ModalLoader.module.css";
interface Props {}

const ModalLoader: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="rounded-lg py-8 px-24 shadow-lg bg-white z-10">
          <div className="flex flex-col items-center justify-center">
            <Loader />
            <div className="text-2xl font-semibold ml-2">Loading</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLoader;
