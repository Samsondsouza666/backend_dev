// console.log(1)

// require('dotenv').config({path:'./env'})
import { } from "dotenv/config.js"
import express from 'express'
import connectDB from './db/index.js'

connectDB()

console.log(process.env.PORT)


