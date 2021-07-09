import { Fragment } from 'react';

export function Square(props) {
    return (
        <Fragment>
            <button className={"square "+((props.className!=null)?props.className:'')} onClick={props.onClick}>
                {props.value}
            </button>
        </Fragment>
    );
}