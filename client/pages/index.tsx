import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import { loadUser } from "../createSlice/action/user";
import { RootState } from "../createSlice/slices";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  // const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  /*   const { email, nickname } = useSelector(
    (state: RootState) => state.user.user
  ); */

  return (
    <>
      <Head>
        <title>HOME | SILVEBEEN</title>
      </Head>
      <div className={styles.container}>
        {/*  <span>{nickname}님 안녕하세요!</span> */}
      </div>
    </>
  );
};

export default Home;
