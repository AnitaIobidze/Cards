import { useEffect, useState } from "react";
const sampleCards = [
  {
    id: 1,
    title: "Ocean Retreat",
    description:
      "Calming blue tones and gentle waves. Perfect for focus or relaxation.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    tag: "Nature",
    price: 10,
  },
  {
    id: 2,
    title: "City Nights",
    description:
      "Skylines, neon, and late-night vibes for your urban inspiration.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    tag: "Urban",
    price: 15,
  },
  {
    id: 3,
    title: "Forest Walk",
    description:
      "A path through pines and light — take a breath and reset.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    tag: "Outdoors",
    price:20,
  },
  {
    id: 4,
    title: "Minimal Desk",
    description:
      "Clutter-free workspace for deep work and clean aesthetics.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    tag: "Workspace",
    price: 25,
  },
  {
    id: 5,
    title: "Golden Desert",
    description:
      "Warm sands and endless dunes to spark wanderlust.",
    image:
      "https://images.unsplash.com/photo-1551516594-56cb78394645?q=80&w=1200&auto=format&fit=crop",
    tag: "Travel",
    price:30,
  },
  {
    id: 6,
    title: "Cozy Reading",
    description:
      "Soft light, hot tea, and your favorite book.",
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop",
    tag: "Lifestyle",
    price:35,
  },
];
function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <h1 className="logo">Grid Cards</h1>
      </div>
    </header>
  );
}

function Card({ card, likeCard, openDeleteModal, openEditModal, openView}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card">
      <div className="card-media">
        <img src={card.image} alt={card.title} loading="lazy" />
        <span className="badge">{card.tag}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{card.title}-${card.price}</h3>
        <p className="card-desc">{card.description}</p>
        <div className="card-actions">
          <button className="btn ghost" onClick={()=>{setLiked(!liked); likeCard(card)}}>
            {liked ? "★ Liked" : "☆ Like"}
          </button>
          <button className="btn-primary" onClick={()=>openView(card)}>View</button>
          <button className="btn-primary" onClick={()=>openEditModal(card)}>Edit</button>
          <button className="delete-btn" onClick={()=>openDeleteModal(card)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
export default function App() {
  const [searchTextByTitle, setSearchTextByTitle] = useState("")
  const [searchTextByDescription, setSearchTextByDescription] = useState("")
  const [likedCards, setLikedCards]=useState([])
  const [filterCard, setFilterCard]=useState(sampleCards)
  const [sort, setSort]=useState("nothing") 
  const [cardToDelete, setCardToDelete]=useState()
  const [cardToEdit, setCardToEdit]=useState()
  const [title, setTitle]=useState("")
  const [price, setPrice]=useState("")
  const [tag, setTag]=useState("")
  const [description, setDescription]=useState("")
  const [showDeleteModal, setShowDeleteModal]=useState(false)
  const [showEditModal, setShowEditModal]=useState(false)
  const [show, setShow]=useState(false)
  const [openCard, setOpenCard]=useState()

  function openView(card){
    setOpenCard(card)
    setShow(true)
  }
  function openDeleteModal(card){
    setShowDeleteModal(true)
    setCardToDelete(card)
  }
  function openEditModal(card){
    setShowEditModal(true)
    setCardToEdit(card)
    setTitle(card.title)
    setDescription(card.description)
    setTag(card.tag)
    setPrice(card.price)
  }
  function editCard(id){
    const updated={...cardToEdit, title, description, price, tag}
    setFilterCard(last=>last.map(c=>(c.id==id ? updated : c)))
    setShowEditModal(false)
  }
  function deleteCard(id){
    setFilterCard(prev=>prev.filter(c=>c.id!==id))
    setShowDeleteModal(false)
  }
  function likeCard(card){
    const filtered=likedCards.filter(x=>x.id!==card.id)
    if(filtered.length!==likedCards.length){
      setLikedCards(filtered)
    }else{
      setLikedCards([...likedCards, card])
    }
  }
  function sum(likedCards){
    let summed=0
    for(let i=0; i<likedCards.length; i++){
      let num=likedCards[i]
      summed=summed+likedCards[i].price;
  
    }
    console.log(summed)
    return summed
  }

  useEffect(() => {
    let cards = sampleCards.filter((card) =>
      card.title.toLowerCase().includes(searchTextByTitle.toLowerCase()) &&
      card.description.toLowerCase().includes(searchTextByDescription.toLowerCase())
    );

    if(sort==="high"){
      cards=cards.sort((a, b)=>b.price-a.price)
    }
    if(sort==="low"){
      cards=cards.sort((a, b)=>a.price-b.price)
    }
    if(sort=="az"){
      cards=cards.sort((a, b)=>a.title.toLowerCase()>b.title.toLowerCase() ? 1 : -1)
    }
    setFilterCard([...cards])
  }, [searchTextByTitle, searchTextByDescription, sort]);
  useEffect(()=>{
    console.log(sum(likedCards))
  },[likedCards])
  return (
    <>
      <Header />
      <div className="site-main">
        <div className="container">
          <div className="toolbar">
            <h2 id="explore" className="section-title">Explore</h2>

            <input
              className="input"
              type="search"
              placeholder="Search cards by title..."
              value={searchTextByTitle}
              onChange={(e) => setSearchTextByTitle(e.target.value)}
            />

            <input
              className="input"
              type="search"
              placeholder="Search cards by description..."
              value={searchTextByDescription}
              onChange={(e) => setSearchTextByDescription(e.target.value)}
            />
            <select value={sort} onChange={(e)=>setSort(e.target.value)}>
              <option value="nothing">Sort by...</option>
              <option value="high">High - Low</option>
              <option value="low">Low - High</option>
              <option value="az">A - Z</option>
            </select>
          </div>

          <div className="grid">
            {filterCard.map((c) => (
              <Card key={c.id} card={c} likeCard={likeCard} deleteCard={deleteCard} openDeleteModal={openDeleteModal} openEditModal={openEditModal} openView={openView} />
            ))}
          </div>
          <p>Total prise is: {sum(likedCards)}</p>
        </div>
        {showDeleteModal && cardToDelete &&(
          <div className="modal">
            <p>Are you sure you want to delete: {cardToDelete.title}</p>
            <div className="modal-content">
              <button onClick={()=>deleteCard(cardToDelete.id)} className="delete-btn">Delete</button>
              <button onClick={()=>setShowDeleteModal(false)} className="cancele-btn">Cancel</button>
            </div>
          </div>
        )}
        {showEditModal && cardToEdit &&(
          <div className="edit-modal">
            <p>Now you are editing: {cardToEdit.title}</p>
            <div className="edit-modal-content">
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>
              <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description"/>
              <input type="text" value={tag} onChange={(e)=>setTag(e.target.value)} placeholder="Tag"/>
              <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price"/>
              <button onClick={()=>editCard(cardToEdit.id)} className="done-btn">Done</button>
              <button onClick={()=>setShowEditModal(false)} className="cancele-btn">Cancel</button>
            </div>
          </div>
        )}
        {show && openCard &&(
          <div className="show-card">
            <div className="card">
              <div className="card-media">
                <img src={openCard.image} alt={openCard.title} loading="lazy" />
                <span className="badge">{openCard.tag}</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{openCard.title}-${openCard.price}</h3>
                <p className="card-desc">{openCard.description}</p>
                <div className="card-actions">
                  <button className="btn ghost">
                    {likedCards.find(x=>x.id===openCard.id) ? "★ Liked" : "☆ Like"}
                  </button>
                  <button className="delete-btn" onClick={()=>setShow(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}