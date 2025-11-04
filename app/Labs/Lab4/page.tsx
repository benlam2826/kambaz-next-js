"use client";
import ReduxExamples from "./ReduxExamples/page";
import ClickEvent from "./ClickEvent";
import Link from "next/link";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import store from "./store";
import { Provider } from "react-redux";

export default function Lab4() {
    function sayHello() {
        alert("Hello from Lab 4!");
    }

    return (
        <Provider store={store}>
        <div className="container py-3" id="wd-lab4">
            <h1 className="mb-3">Lab 4</h1>

            <ul className="nav nav-pills gap-2 mb-4">
                <li className="nav-item"><a className="nav-link active" href="#events">User Events</a></li>
                <li className="nav-item"><Link className="nav-link" href="/">Kambaz</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/Labs/Lab1">Labs Home</Link></li>
            </ul>

            <section id="events" className="mb-4">
                <ClickEvent />
                <PassingDataOnEvent />
                <PassingFunctions theFunction={sayHello} />
                <EventObject />
                <Counter />
                <BooleanStateVariables />
                <StringStateVariables />
                <DateStateVariable />
                <ObjectStateVariable />
                <ArrayStateVariable />
                <ParentStateComponent />
                <ReduxExamples />
            </section>
        </div>
        </Provider>
    );
}