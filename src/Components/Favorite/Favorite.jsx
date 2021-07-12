import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import favStyle from './Favorite.module.css'
import $ from 'jquery'
function Favorite() {
    const [allFav, setAllFav] = useState([]);

    function getFav() {
        if (localStorage.getItem('Favorite') == null) {

        } else {
            setAllFav(JSON.parse(localStorage.getItem('Favorite')));
        }


    }

    function removeFav(_id) {
        if (localStorage.getItem('Favorite') == null) {

        } else {
            let Fav = JSON.parse(localStorage.getItem('Favorite'));

            Fav.forEach((element, index) => {
                if (element.ID === _id) {
                    Fav.splice(index, index);
                }
            });
            localStorage.setItem('Favorite', JSON.stringify(Fav));
            getFav();
        }


    }
    useEffect(() => {
        getFav();
        $('#allFavorite').fadeIn(1000);
    }, [])

    return (
        <>
            <div id="allFavorite" className="container mx-auto  my-5">
                <div className="row ">
                    {allFav.map((value, index) => {
                        return (
                            <div key={index} className={`col-md-4 my-1 p-2    ${favStyle.notes}`}>

                                <div className={`p-4 rounded ${favStyle.note}`}>
                                    <h3 className="float-left" >{value.title} </h3>
                                    <i onClick={() => { removeFav(value.ID) }} className={`fas fa-trash-alt float-right  ${favStyle.del}`}></i>
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

export default Favorite
