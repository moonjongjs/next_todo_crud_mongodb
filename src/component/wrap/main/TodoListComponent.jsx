"use client";
import React, {useState, useEffect, useRef}  from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import './scss/TodoListComponent.scss';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModalAction } from '@/app/store/confirmModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function TodoListComponent() {

    const dispatch = useDispatch();
    const confirmModal = useSelector((state)=>state.confirmModal);

    const [todo, setTodo] =useState('');                // 할일 입력 상자 상태변수
    const [todoList, setTodoList] = useState([]);       // 할일 전체 목록 상태변수
    const [expires, setExpires] = useState('');         // 날짜 입력 상자 상태변수
    const [update, setUpdate] = useState({});           // 수정할 객체 내용 상태변수
    const [checkUpdate, setCheckUpdate] = useState({}); // 수정할 체크박스 객체내용 상태변수
    const [crud, setCrud] = useState('');               // CRUD 알림메시지 상태변수
    const [del, setDel] = useState('');                 // 삭제 번호 저장 상태변수
    const delNum = useRef('');



    const [page, setPage] = React.useState(1);

    // 게산만 사용하는 일반변수 선언
    const list = 7;  // 한페이지 목록 줄수
    const 시작 = (page - 1) * list;
    const 끝   = 시작 + list;
    const 슬라이스 = todoList.slice(시작,  끝);  // 한페이지 단위로 5줄씩 배열 저장

    // 그룹 페이지네이션
    const 총페이지수 = Math.ceil(todoList.length / list );
    const 페이지그룹 = 5;
    const 현재그룹번호 = Math.floor((page-1)/페이지그룹);
    const 총그룹수 = Math.ceil(총페이지수 / 페이지그룹);
    const 그룹시작 = 현재그룹번호 * 페이지그룹 + 1;
    const 그룹끝 =  Math.min( (그룹시작 + 페이지그룹 - 1), 총페이지수 );
    const 페이지번호 = [...Array(그룹끝 - 그룹시작 + 1)].map((item, i)=>그룹시작+i);
 
    // 다음, 이전, 페이지번호 클릭 이벤트
    const onClickPage=(e, n)=>{
        e.preventDefault();
        setPage( n ) // 페이지 번호 변경
    }

    // [3] 리액트 쿼리 구현
    /////////////////////////////////////////////////////////////////////////
    // [3] R : Read => 할일 목록 함수 구현 todoListAxiosApi()
    /////////////////////////////////////////////////////////////////////////

    // React Query: 목록 GET
    // eslint-disable-next-line no-unused-vars
    const qc = useQueryClient();
    
    // eslint-disable-next-line no-unused-vars
    const { data: fetched, isLoading, isError } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const res = await axios.get("/api/todos");
            if (res.status !== 200) throw new Error("목록 로드 실패");
            return res.data;
        },
    });

    useEffect(() => {
       if (fetched) {
            // 항상 createdAt(=등록일) 기준으로 최신순 정렬
            const sorted = [...fetched].sort(
                (a, b) => new Date(b.등록일) - new Date(a.등록일)
            );
            setTodoList(sorted);
        }
    }, [fetched]);




    /////////////////////////////////////////////////////////////////////////
    // [0] 기한 날짜 시간 입력 상자
    /////////////////////////////////////////////////////////////////////////     
    const onChangeTodoDate=(e)=>{
        setExpires(e.target.value);         // 날짜 입력 상태        
        if(Object.keys(update).length > 0){ // 날짜 수정 상태       
           let 할일 = update;
            할일 = {
                ...할일,
                기한: e.target.value
            }
           setUpdate(할일); // 날짜 수정
           setCrud('UPDATE');
        }
    }

    // 날짜 수정 상태
    const onMouseLeaveDatetimeEvent=(e)=>{
        if(Object.keys(update).length > 0){
            setCrud('UPDATE');
        }
    }

    // 수정 버튼 클릭 이벤트
    const onClickUpdateOk=(e)=>{
        e.preventDefault();
        setCrud('UPDATE_OK');
    }

    // 수정 취소 버튼 클릭 이벤트
    const onClickUpdateCancle=(e)=>{
        e.preventDefault();
        setCrud('UPDATE_CANCLE');
    }


    /////////////////////////////////////////////////////////////////////////
    // [1] 할일 입력 상자
    /////////////////////////////////////////////////////////////////////////      
    const onChangeTodoInput=(e)=>{
   
        if(Object.keys(update).length > 0){   
           let 할일 = update;
            할일 = {
                ...할일,
                할일: e.target.value
            }
            // console.log( 할일 );
            setUpdate(할일); // 날짜 수정
            setCrud('UPDATE');
        }
        setTodo( e.target.value );
    }

    
    /////////////////////////////////////////////////////////////////////////
    // [2] 할일 입력 상자, 날자 시간 달력 입력 상자 엔터키, 마우스 + 클릭 이벤트
    /////////////////////////////////////////////////////////////////////////  
    const onKeyDownTodoInputSave=(e)=>{
        if(e.key==='Enter' || e.type==='click'){ // 키보드 엔터키 또는 마우스클릭
            if(todo.trim()==='') { // 공백제거하고 공백이면
                // alert('할일을 입력하세요');
                dispatch(confirmModalAction({
                    메시지: '할일을 입력하세요',
                    isOpen: true,
                    isYesNo: false,
                }))
                return;
            }
            if(expires==='') {
                // alert('기한 날짜를 입력 선택하세요');
                dispatch(confirmModalAction({
                    메시지: '기한 날짜를 입력 선택하세요',
                    isOpen: true,
                    isYesNo: false,
                }))
                return;
            }
            
            // 수정           
            if(Object.keys(update).length > 0){ // ['번호', '할일', '완료', '기한']                
                setCrud('UPDATE');                        
            }
            else{ 
                setCrud('INSERT');                 
            }
        }
    }



    /////////////////////////////////////////////////////////////////////////
    // [4] U : Update 체크박스 => 할일 완료
    /////////////////////////////////////////////////////////////////////////
    const onChangeCheckbox=(e, 할일)=>{
        e.stopPropagation();  // 부모 이벤트에게 전파를 차단
       
        할일['완료'] = 할일.완료===0?1:0; // 완료 수정은 1회만       
        setCheckUpdate(할일); // DB에 전달하기 위해서 체크박스 업데이트 내용 담는다.

        setCrud('UPDATE_CHK');
    }

    /////////////////////////////////////////////////////////////////////////
    // [5] U : Update 할일, 기한 수정
    /////////////////////////////////////////////////////////////////////////
    const onClickTodoUpdate=(할일)=>{ // LI 태그클릭     
        if(update.아이디===할일.아이디) return; 
        setCrud('');    
        // 현재 할일 선택
        setUpdate( 할일 );    // {...}  상태변수에 저장        
        setTodo(할일.할일)    // 입력상자에 수정내용 할일 입력
        setExpires(할일.기한) // 날짜시간 입력상자에 기한 입력
    }


    /////////////////////////////////////////////////////////////////////////
    // [6] D : Delete => 할일 삭제
    /////////////////////////////////////////////////////////////////////////    
    const onClickDelBtn=(e, 아이디)=>{
        e.stopPropagation();  // 스톱프로파게이션 : li 부모의 click 이벤트 전파를 차단

        delNum.current = 아이디;  // 삭제 임시 번호 초기화
        dispatch(confirmModalAction(
            {
                메시지: '정말로 삭제 하시겠습니까?',
                isOpen: true,
                isYesNo: true,
            }
        ))
    }

    useEffect(()=>{
        if(confirmModal.isDeleteYes){           
            const obj = {
                메시지: '',
                isOpen: false,
                isYesNo: false
            }
            dispatch(confirmModalAction(obj)) // store 초기화
            setDel(delNum.current);  // 번호
            delNum.current = null;   // 삭제 임시 번호 초기화
            setCrud('DELETE');
        }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmModal.isDeleteYes])



    /////////////////////////////////////////////////////////////////////////
    // [7] CRUD WATCHERS 감시자
    ///////////////////////////////////////////////////////////////////////// 
    useEffect(()=>{

        // 리액트 쿼리로 교체
        const crudAxiosApi = async (url, method, formData) => {
            if (url ==='' || method ==='' || formData === null)  return;

            try {
                const res = await axios({
                    url: url, 
                    method: method,
                    data: formData,
                    headers: { 'Content-Type': 'application/json' }
                })

                if (res.status === 200 && res.data === 1) {
                    // 2) 성공 공통 처리
                    setDel('');
                    setCrud('');

                    // 성공 후 최신화( fresh 남아 있어도 강제 stale → 재조회 )
                    qc.invalidateQueries({ queryKey: ['todos'] });
                }
                
            } catch (err) {
                console.log('AXIOS 실패!', err);
            }
        };


        let url = '';
        let method = '';
        let formData = null;

        if(crud==='INSERT'){                // 입력
            url = '/api/todos';
            method = 'POST';
            formData = {
                w_todo: todo.trim(),
                w_completed: 0,
                w_expires: expires.toString(),   
                w_created_date: new Date().toString()
            }   
            setCrud('');
            setTodo('');
            setExpires('');
            
        }
        else if(crud==='UPDATE_CHK'){       // 수정 체크박스 완료 여부(TRUE / FALSE)
            url = '/api/todos';
            method = 'PUT';
            formData = {
                flag: 'PUT1',
                아이디: checkUpdate.아이디,
                w_completed: checkUpdate.완료                
            }   
            setCrud('');     
        
        }
        else if(crud==='UPDATE_CANCLE'){    // 수정 취소
            setUpdate('');
            setExpires('');
            setTodo('');
            setCrud('');            
        }
        else if(crud==='UPDATE_OK'){        // 수정 요청            
            url = '/api/todos';
            method = 'PUT';      
            formData = {
                flag: 'PUT2',
                아이디: update.아이디,
                w_todo: todo.trim(),
                w_expires: expires
            }
            setUpdate('');
            setExpires('');
            setTodo('');
            setCrud('');   

        }
        else if(crud==='DELETE'){           // 삭제
            url = '/api/todos';
            method = 'DELETE';
            formData = {
                아이디: del
            };
            setDel('');
            setCrud('');
        }       
        crudAxiosApi(url, method, formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[crud])

    return (
        <section id="todoSection">
            <div className="container">
                <div className="input-box">
                    <div className="input-container">
                        <input 
                            type="datetime-local" 
                            name='date'
                            id='date'
                            onChange={onChangeTodoDate}                            
                            value={expires}
                            onMouseLeave={onMouseLeaveDatetimeEvent}
                        />
                        <input 
                            type="text" 
                            name="todoInput" 
                            id="todoInput" 
                            placeholder="+ 할 일 추가"
                            onChange={onChangeTodoInput}
                            onKeyDown={onKeyDownTodoInputSave}
                            value={todo}
                        />
                        {/* + 버튼 */}
                        <button className="add-btn" onClick={onKeyDownTodoInputSave}>
                            <img src="./img/add_2_50dp_5F6368_FILL0_wght300_GRAD0_opsz48.svg" alt="" />
                        </button>
                    </div>
                </div>
                <div className="list-box">
                    <div className="list-container">

                        <hr />
                        <div className="title title1">
                            <h3>
                                <strong>할일</strong>
                                <span className="todo-count">&nbsp;({todoList.filter((item)=>item.완료===0).length})</span>
                            </h3>
                        </div>
                        <div className="todo-list-box">
                            <ul id="todoListBox">                                
                               
                                {   isLoading && <li style={{padding:'2rem'}}>로딩…</li>    }
                                {   isError   && <li style={{padding:'2rem'}}>목록 로드 실패</li>   }

                                    
                                {   // eslint-disable-next-line array-callback-return                                 
                                    슬라이스.map((item)=>{
                                        if(item.완료===0){
                                            return(
                                               <li key={item.아이디} data-id={item.아이디} className={`${item.완료?'completed':''} ${(crud==='UPDATE' && (update.아이디===item.아이디)) ? ' on':''}`}>
                                                   <div>
                                                        <div className="left-box">
                                                            <input 
                                                                type="checkbox" 
                                                                data-id={item.아이디} 
                                                                name={`chk${item.아이디}`} 
                                                                id={`chk${item.아이디}`}
                                                                className='chk'
                                                                value={item.할일}
                                                                checked={item.완료}
                                                                onChange={(e)=>onChangeCheckbox(e, item)}
                                                            />

                                                            <p onClick={()=>onClickTodoUpdate(item)}>
                                                                <span>{format(item.기한, 'yyyy-MM-dd HH:mm')}</span> 
                                                                <strong>{item.할일}</strong>
                                                            </p>
                                                        </div>
                                                        <span className='right-box'>                                                            
                                                            
                                                            {
                                                            (crud==='UPDATE' && (update.아이디===item.아이디)) && 
                                                            <span className='update-box'>
                                                                <button  onClick={onClickUpdateOk}>수정</button>
                                                                <button  onClick={onClickUpdateCancle}>취소</button>
                                                            </span>
                                                            }   
                                                            <button
                                                                className="del-btn"
                                                                value={item.아이디}
                                                                data-id={item.아이디}
                                                                onClick={(e)=>onClickDelBtn(e,item.아이디)}
                                                            />                                                 
                                                        </span>
                                                   </div>
                                               </li> 
                                            )
                                        }
                                    })     
                               }
                            </ul>
                        </div>

                        <hr />
                        <div className="title title2">
                            <h3>
                                <strong>완료</strong>
                                <span className="check-count">&nbsp;({todoList.filter((item)=>item.완료===1).length})</span>
                            </h3>
                        </div>
                        <div className="check-list-box">                            
                            <ul id="checkListBox">

                            {
                                // eslint-disable-next-line array-callback-return
                                슬라이스.map((item)=>{
                                    if(item.완료===1){
                                        return(
                                            <li key={item.아이디} data-id={item.아이디} className={`${item.완료?'completed':''} ${(crud==='UPDATE' && (update.아이디===item.아이디)) ? ' on':''}`}>
                                                <div>
                                                    <div className="left-box">
                                                        <input 
                                                            type="checkbox" 
                                                            data-id={item.아이디} 
                                                            name={`chk${item.아이디}`} 
                                                            id={`chk${item.아이디}`}
                                                            className='chk'
                                                            value={item.할일}
                                                            checked={item.완료}
                                                            onChange={(e)=>onChangeCheckbox(e, item)}
                                                        />

                                                        <p onClick={()=>onClickTodoUpdate(item)}>
                                                            <span>{format(item.기한, 'yyyy-MM-dd HH:mm')}</span> 
                                                            <strong>{item.할일}</strong>
                                                        </p>
                                                    </div>
                                                    <span className='right-box'>                                                            
                                                        
                                                        {
                                                        (crud==='UPDATE' && (update.아이디===item.아이디)) && 
                                                        <span className='update-box'>
                                                            <button  onClick={onClickUpdateOk}>수정</button>
                                                            <button  onClick={onClickUpdateCancle}>취소</button>
                                                        </span>
                                                        }   
                                                        <button
                                                            className="del-btn"
                                                            value={item.아이디}
                                                            data-id={item.아이디}
                                                            onClick={(e)=>onClickDelBtn(e,item.아이디)}
                                                        />                                                 
                                                    </span>
                                                </div>
                                            </li> 
                                        )
                                    }
                                })     
                            }

                            </ul>
                        </div>


                        <div className="pagenation-box">

                                {/* 처음 */}
                            {    
                                현재그룹번호 > 0 &&
                                <button className="icon1"  onClick={(e)=>onClickPage(e, 1)}><i className="bi bi-chevron-bar-left"></i></button>
                            }
                                {/* 이전 */}
                            {
                                그룹시작 > 1 && 
                                <button className="icon2" onClick={(e)=>onClickPage(e, 그룹시작-1)}><i className="bi bi-chevron-left"></i></button>
                            }
                                <ul>
                                {
                                    페이지번호.map((n)=>
                                        <li key={n}  data-key={n} >
                                            <a href="!#" 
                                                title={n} 
                                                className={page===n ? "on" : ''}
                                                onClick={(e)=>onClickPage(e, n)}
                                            >{n}</a>
                                        </li>
                                    )

                                }
                                </ul>

                                {/* 다음 */}
                            {
                                그룹끝 < 총페이지수 &&
                                <button className="icon2" onClick={(e)=>onClickPage(e, 그룹끝+1)}><i className="bi bi-chevron-right"></i></button>
                            }
                                {/* 끝 */}
                            {
                                현재그룹번호 < (총그룹수-1) && 
                                <button className="icon1" onClick={(e)=>onClickPage(e, 총페이지수)}><i className="bi bi-chevron-bar-right"></i></button>
                            }

                            </div>

                    </div>
                </div>
            </div>
        </section>
    );
}