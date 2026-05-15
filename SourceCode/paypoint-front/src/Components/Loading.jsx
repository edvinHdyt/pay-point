

const Loading = (props) => {
    const getImagLoadingUrl = (name) => {
        return new URL(`../assets/images/loading/${name}`, import.meta.url).href;
    }

    return (
        <img src={getImagLoadingUrl('spinner.gif')} alt="spinner" className={props.classLoading}/>
    )
}

export default Loading;