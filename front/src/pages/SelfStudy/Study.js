import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./SelfStudy.css";
import { getSelfStudyProgress, getStudyList, getStudyInfo, } from "../../slices/selfstudySlice";
// import { useDispatch } from "react-redux";
import styled from "styled-components";
import background from "../../asset/images/SelfstudyImg/CsStudyBackground.png";
import btn from "../../asset/images/SelfstudyImg/버튼.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import styled from "styled-components";
// 각 주인공 나오는 배경 만들면 될듯
// import background from './SelfStudyBackground.gif';
// import { Link } from 'react-router-dom';

const CsStudyBackground = styled.div`
  position: related;
  height: 100vh;
  width: 100vw;
  /* background-color: #352208; */
  background: url(${background}) center no-repeat;
  background-size: 100% 100%;
`;

const Type = styled.div`
  & {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3vw;
    color: white;
    vertical-align: center;
    margin-bottom: 1.5vw;
    height: 7vw;
    width: 20vw;
    z-index: 1;
  }  
    
  &:after {  
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background: url(${btn}) center no-repeat;
    background-size: 100% 100%;
    z-index: -1;
  } 
`;
const CSselfStudy = () => {

  const dispatch = useDispatch();
  // const location = useLocation()
  useEffect(() => {
    const startGetStudyInfo = async () => {
      await dispatch(getStudyInfo())
    }
    startGetStudyInfo()
    // dispatch(getQuizList())
    const getInitialStudy = async () => {
      //  CS, ALGORITHM, BACKEND, FRONTEND, LANGUAGE
      const initialStudyInfo = {
        category: category,
        subject: subject,
        offset: offset,
        limit: limit,
      }
      const res = await dispatch(getStudyList(initialStudyInfo))
      const newStudyList = res.payload
    };
    getInitialStudy()

  }, [dispatch])

  const study = useSelector((state) => state.study)
  const studyList = useSelector((state) => state.study.studyList.studyInfo)
  const studyInfo = useSelector((state) => state.study.studyInfo)
  const maxPage = useSelector((state) => state.study.studyList.totalPage)
  // const [studyInfo, setStudyInfo] = useState(study.studyInfo)
  // const [studyList, setStudyList] = useState(study.studyList.studyInfo)
  const [showingMarkdown, setShowingMarkdown] = useState('')
  const [isShowMarkdown, setIsShowMarkdown] = useState(false)
  const [category, setCategory] = useState(0)
  const [subject, setSubject] = useState('network')
  const [offset, setOffset] = useState(0)
  const [limit, setlimit] = useState(6)
  const [nowpage, setNowpage] = useState(0)
  const [pages, setPages] = useState([1, 2, 3, 4])

  useEffect(() => {
    if (maxPage >= 4) {
      setPages([1, 2, 3, 4])
    } else {
      var pages = []
      for (var i = 1; i <= maxPage; i++) {
        pages.push(i)
      }
      setPages(pages)
    }
  }, [maxPage])
  
  useEffect(() => {
  }, [studyList])

  // md정리창 보여주는 함수
  const showMarkdown = (content) => {
    setShowingMarkdown(content)
    setIsShowMarkdown(true)
  }
  const closeStudy = () => {
    setIsShowMarkdown(false)
  }
  
  // 카테고리 변경하는 함수 pageInfo = {category: category, subject: subject,} 
  const changeCategory = async (pageInfo) => {
    const newStudyInfo = {
      category: studyInfo[pageInfo.category].category,
      subject: pageInfo.subject,
      offset: 0,
      limit: limit,
    }
    setIsShowMarkdown(false)
    changeStudyList(newStudyInfo)
    await setOffset(0)
    await setNowpage(0)
    await setCategory(pageInfo.category)
    await setSubject(pageInfo.subject)

  }

  // 서브젝트 변경하는 함수 pageInfo = {category: category, subject: subject,} 
  const changeSubject = async (info) => {
    const newStudyInfo = {
      category: studyInfo[category].category,
      subject: info.subject,
      offset: 0,
      limit: limit,
    }
    setIsShowMarkdown(false)
    await setOffset(0)
    await setNowpage(0)
    await setSubject(info.subject)
    await changeStudyList(newStudyInfo)
  }

  // 페이지 변경하는 함수
  const changePage = async (page) => {
    const newStudyInfo = {
      category: category,
      subject: subject,
      offset: page - 1,
      limit: limit,
    }
    console.log(newStudyInfo)
    await changeStudyList(newStudyInfo)
    await setOffset(page-1)
  }

  // 보는 페이지 변경하는 함수
  const changeStudyList = (newStudyInfo) => {
    const studyInfo = {
      category: newStudyInfo.category,
      subject: newStudyInfo.subject,
      offset: newStudyInfo.offset,
      limit: newStudyInfo.limit,
    }
    setIsShowMarkdown(false)
    dispatch(getStudyList(studyInfo))
  }

  // 왼쪽 화살표 클릭
  const leftArrow = () => {
    console.log('왼')
    if (nowpage > 0) {
      const newStudyInfo = {
        category: category,
        subject: subject,
        offset: (nowpage - 1) * 4,
        limit: limit,
      }
      setPages([(nowpage - 1) * 4 + 1, (nowpage - 1) * 4 + 2, (nowpage - 1) * 4 + 3, (nowpage - 1) * 4 + 4])
      changeStudyList(newStudyInfo)
      setNowpage(nowpage - 1)
    }
  }

  // 오른쪽 화살표 클릭
  const rightArrow = () => { 
    console.log('오')
    if ((nowpage + 1) * 4 + 1 <= maxPage){
      const newStudyInfo = {
        category: category,
        subject: subject,
        offset: (nowpage + 1) * 4,
        limit: limit,
      }
      if ((nowpage + 2) * 4 <= maxPage) {
        setPages([(nowpage + 1) * 4 + 1, (nowpage + 1) * 4 + 2, (nowpage + 1) * 4 + 3, (nowpage + 1) * 4 + 4,])
      } else {
        var pages = []
        for (var i = (nowpage + 1) * 4 + 1; i <= maxPage; i++) {
          pages.push(i)
        }
        setPages(pages)
      }
      changeStudyList(newStudyInfo)
      setNowpage(nowpage + 1)
    }
  }

  

  return (
    <>
      <CsStudyBackground>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Type onClick={changeCategory.bind(null, {category: 0, subject: "network",})} style={{ textDecoration: "none", cursor: "pointer", }}>
          CS
        </Type>
        <Type onClick={changeCategory.bind(null, {category: 4, subject: "algorithm",})} style={{ textDecoration: "none", cursor: "pointer", }}>
          알고리즘
        </Type>
        <Type onClick={changeCategory.bind(null, {category: 1, subject: "spring",})} style={{ textDecoration: "none", cursor: "pointer", }}>
          백앤드
        </Type>
        <Type onClick={changeCategory.bind(null, {category: 2, subject: "react",})} style={{ textDecoration: "none", cursor: "pointer", }}>
          프론트앤드
        </Type>
        <Type onClick={changeCategory.bind(null, {category: 3, subject: "java",})} style={{ textDecoration: "none", cursor: "pointer", }}>
          프로그래밍 언어
        </Type>

        <div className="StudyContainer">

          {/* 과목 목록 */}
          <div className="subjectbar">
            {studyInfo[category].subjectList.map((subject, index) => (
              <p key={index} className="subjectItem" onClick={changeSubject.bind(null, {subject: subject.subject})}>
                {subject.subject}
              </p>
            ))}
          </div>

          <div className="studyItems container">
            <div className="row justify-content-center">
              {studyList.map((study, index) => (
                <div key={index} className="col-3 StudyCompnent" onClick={showMarkdown.bind(null, study.content)}>
                  {study.title}
                </div>
              ))}
            </div>
          </div>

          {
            isShowMarkdown
            ?
            <div className="showingMarkdown">
                <div onClick={closeStudy} className="CloseQuiz">X</div>
              <ReactMarkdown children = {showingMarkdown} remarkPlugins={[remarkGfm]}>
              </ReactMarkdown>  
            </div>
            : null
          }


          <div className="paginationBar">
            <p className="paginationItem" onClick={leftArrow}> {`<`} </p>
            {pages.map((page, index) => (
              <p key={index} className="paginationItem" onClick={changePage.bind(null, page + nowpage * 4)}>
                {page + nowpage * 4}
              </p>
              ))}
            <p className="paginationItem" onClick={rightArrow}>{`>`}</p>
          </div>
        </div>
      </CsStudyBackground>
    </>
  );
};

export default CSselfStudy;
