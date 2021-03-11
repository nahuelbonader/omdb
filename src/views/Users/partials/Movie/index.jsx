import React from "react"
import MovieCard from "../../../../components/MovieCard"
import style from "./style.module.scss"

export default ({movie}) => (<MovieCard movie={movie} externalStyle={style}/>)