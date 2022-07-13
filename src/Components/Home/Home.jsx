import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import HomeStyle from './Home.module.css'
import $ from 'jquery'
function Home() {
    const [allNotes, setAllNotes] = useState([]);
    const [NoteID, setNoteID] = useState('');
    const [waiting, setWaiting] = useState(false);

    let token = localStorage.getItem('token')
    let Url = 'https://route-egypt-api.herokuapp.com/'
    if (token) {
        var decoded = jwt_decode(token);
    }
    const [note, setNote] = useState({ title: '', desc: '', token, userID: decoded._id });

    async function getAllNotes() {
        let { data } = await axios.get(Url + 'getUserNotes', {
            headers: {
                token,
                userID: decoded._id
            }
        })
        if (data.Notes === undefined) {
            setAllNotes([])
        } else {
            setAllNotes(data.Notes)
        }

    }
    function getNote({ target }) {
        setNote({ ...note, [target.name]: target.value });
    }
    async function sendNote(e) {
        e.preventDefault();
        setWaiting(true)
        let { data } = await axios.post(Url + 'addNote', note);
        if (data.message === 'success') {
            $('#exampleModal').modal('hide')
            getAllNotes();
            setWaiting(false)
            $('.form-control').val('');
        }
    }

    async function Delete(e) {
        e.preventDefault();
        setWaiting(true)
        let { data } = await axios.delete(Url + 'deleteNote', {
            data: {
                NoteID,
                token
            }
        });
        if (data.message === 'deleted') {
            $('#deleteNote').modal('hide')
            getAllNotes();
            setWaiting(false);

        }
    }
    async function update(e) {

        e.preventDefault();
        let { data } = await axios.put(Url + "updateNote", {
            data: {
                "title": note.title,
                "desc": note.desc,
                "userID": note.userID,
                "token": note.token
            }
        });
        console.log(data.message);


    }

    function getID(_id) {
        setNoteID(_id);
    }
    function setInput(_title, _desc) {
        $('#noteDesc').val(_desc);
        $('#noteTitle').val(_title);

    }


    async function addFavorite(_title, _id, _desc) {
        let note = { title: _title, desc: _desc, ID: _id };
        let allFav, founded = false;
        if (localStorage.getItem("Favorite") === null) {
            allFav = []
        } else {
            allFav = JSON.parse(localStorage.getItem('Favorite'));
        }
        allFav.forEach((element, index) => {
            console.log(index);
            if (element.title === note.title && element.desc === note.desc) {
                allFav.splice(index, index);
                founded = true;
            }
        });
        console.log(allFav);
        if (founded) {
            $(`#${_id}`).css("color", "#000")
            localStorage.setItem('Favorite', JSON.stringify(allFav));
        } else {
            $(`#${_id}`).css("color", "#ff006a")
            allFav.push(note);
            localStorage.setItem('Favorite', JSON.stringify(allFav));

        }

    }
    function loadFav() {
        if (localStorage.getItem('Favorite') == null) {

        } else {
            let Fav = JSON.parse(localStorage.getItem('Favorite'));
            Fav.forEach(element => {
                $(`#${element.ID}`).css("color", "#ff006a");

            });
        }
    }

    useEffect(async () => {
        await getAllNotes();
        $('#AllNotes').slideDown(1000);
        loadFav();

    }, [])

    return (
        <>
            {/* =================================================================== Add new Note ====================================== */}

            <div className="container my-5 mx-auto overflow-hidden ">
                <div className={`col-md-12 m-auto text-right   ${HomeStyle.addNote}   ${HomeStyle.F_T_T_D}`}>
                    <a className="shadow p-2 btn  rounded left_color" data-toggle="modal" data-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add
                        New</a>
                </div>
            </div>

            {/* ================================================================= Note Modal =========================================== */}

            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form className="" >
                    <div className="modal-dialog mx-auto">
                        <div className="modal-content ">

                            <div className="modal-header py-3 px-2">
                                <h5 className="modal-title" id="exampleModalLabel">ADD New </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body p-2">
                                <input onChange={getNote} placeholder="Type Title" name="title" className="form-control test" type="text" />
                                <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer p-2">
                                <button type="button" className="btn btn-danger px-3 py-1 mr-2" data-dismiss="modal">Close</button>
                                <button onClick={sendNote} type="submit" className="btn left_color p-1"> {waiting ? 'Waiting........' : 'Add Note'} </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* ============================================================= Delete Modal =========================================== */}


            <div className="modal fade" id="deleteNote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form >
                    <div className="modal-dialog mx-auto">
                        <div className="modal-content ">
                            <div className="modal-header py-3 px-2">
                                <h5 className="modal-title" id="exampleModalLabel">Delete? </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body ">
                                <h3 className="m-0 py-1 px-2 my-2 text-muted">Are you sure?</h3>
                            </div>
                            <div className="modal-footer p-2">
                                <button type="button" className="btn left_color px-4 py-1 mr-2" data-dismiss="modal">Close</button>
                                <button onClick={Delete} className="btn btn-danger p-1"> {waiting ? 'Waiting........' : 'Delete Note'} </button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>


            {/* ============================================================= Update Modal =========================================== */}

            <div className="modal fade" id="updateNote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form className="" >
                    <div className="modal-dialog mx-auto">
                        <div className="modal-content ">

                            <div className="modal-header py-3 px-2">
                                <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body p-2">
                                <input id="noteTitle" onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea id="noteDesc" onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer p-2">
                                <button type="button" className="btn btn-danger px-2 py-1 mr-2" data-dismiss="modal">Close</button>
                                <button onClick={update} type="submit" className="btn left_color p-1"> {waiting ? 'Waiting.....' : 'Update'} </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            {/* ============================================================= All Notes =========================================== */}

            <div id="AllNotes"  className="container mx-auto overflow-hidden ">
                <div  className="row ">
                    {allNotes.map((value, index) => {
                        return (
                            <div key={index} className={`col-md-4 my-1 p-2        ${HomeStyle.notes}`}>

                                <div className={`p-4 rounded ${HomeStyle.note}`}>
                                    <h3 className="float-left">{value.title} </h3>
                                    <i id={`${value._id}`} onClick={() => { addFavorite(value.title, value._id, value.desc) }} className={`fas fa-heart float-right ${HomeStyle.fav}`}></i>
                                    <i onClick={() => { setInput(value.title, value.desc); getID(value._id); }} data-toggle="modal" data-target="#updateNote" className={`fas fa-edit float-right px-3 ${HomeStyle.edit}`}></i>
                                    <i onClick={() => { getID(value._id) }} data-toggle="modal" data-target="#deleteNote" className={`fas fa-trash-alt float-right  ${HomeStyle.del}`}></i>
                                    <span className="clearfix"></span>
                                    <p> {value.desc}</p>
                                </div>
                            </div>
                        )
                    })}



                </div>
            </div>

        </>
    )
}

export default Home
