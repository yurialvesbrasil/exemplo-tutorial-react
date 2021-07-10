export function Square(props) {
    return (
        <button key={props.id} className={"square " + ((props.className != null) ? props.className : '')} onClick={props.onClick}>
            {props.value}
        </button>
    );
}