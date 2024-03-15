const {useState} = React

export function LongTxt({txt, length = 100}){
    const [isSeeMore,setSeeMore] = useState(false)
    

    return <section className="long-txt">
    <span>{isSeeMore ? txt :txt.slice(0,length)}</span>
    {!isSeeMore && <button className="see-more-btn" onClick={() => setSeeMore(prevIsSeeMore => !prevIsSeeMore)}>See more</button>}
    </section>

}