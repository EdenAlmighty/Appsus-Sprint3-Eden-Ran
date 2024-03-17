import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = {title: '', price: 0, page: 0}

var gBooks = 
[
  {
      "title": "The Lord of the Rings",
      "subtitle": "",
      "authors": [
          "John Ronald Reuel Tolkien"
      ],
      "publishedDate": "1991",
      "description": "A beautiful illustrated boxed set collecting the two most popular Tolkien hardbacks -- the Centenary edition of The Lord of the Rings and the 60th Anniversary edition of The Hobbit, both illustrated by Alan Lee. Since they were first published, The Hobbit and The Lord of the Rings have been two books people have treasured. Steeped in unrivalled magic and otherworldliness, these works of sweeping fantasy have touched the hearts of young and old alike. Between them, nearly 100 million copies have been sold around the world. And no editions have proved more popular than the two that were illustrated by award-winning artist, Alan Lee -- the Centenary edition of The Lord of the Rings and the 60th Anniversary edition of The Hobbit. Now, for the first time, these two beautifully illustrated hardbacks have been collected together into one deluxe boxed set. Readers will be able to follow the complete story of the Hobbits and their part in the quest for the Ring -- beginning with Bilbo's fateful visit from Gandalf and culminating in the dramatic climax between Frodo and Gollum atop Mount Doom -- while also enjoying over seventy full-page colour paintings and numerous illustrations which acco",
      "pageCount": 1193,
      "categories": [
          "Adventure stories"
      ],
      "thumbnail": "http://books.google.com/books/content?id=Jelk7EMpA7sC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      "language": "en",
      "listPrice": {
          "amount": 100,
          "currencyCode": "🚫(From Google)",
          "isOnSale": false
      },
      "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=Jelk7EMpA7sC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=Jelk7EMpA7sC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      },
      "id": "VVxOS"
  },
  {
      "title": "The Lord of the Rings",
      "subtitle": "",
      "authors": [
          "J. R. R. Tolkien"
      ],
      "publishedDate": "2022-08-18",
      "description": "Begin your journey into Middle-earth. A New Legend Begins on Prime Video, in The Lord of the Rings: The Rings of Power. This one-volume, paperback edition includes The Fellowship of the Ring, The Two Towers, and The Return of the King, together with the Appendices in full. Sauron, the Dark Lord, has gathered to him all the Rings of Power - the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring - the ring that rules them all - which has fallen into the hands of the hobbit, Bilbo Baggins. In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as the Ring is entrusted to his care. He must leave his home and make a perilous journey across the realms of Middle-earth to the Crack of Doom, deep inside the territories of the Dark Lord. There he must destroy the Ring forever and foil the Dark Lord in his evil purpose.",
      "pageCount": 0,
      "categories": [
          "Fiction"
      ],
      "thumbnail": "http://books.google.com/books/content?id=GfrqzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      "language": "en",
      "listPrice": {
          "amount": 100,
          "currencyCode": "🚫(From Google)",
          "isOnSale": false
      },
      "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=GfrqzgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=GfrqzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      },
      "id": "Aso9o"
  },
  {
      "title": "The Lord of the Rings: The Fellowship of the Ring, The Two Towers, The Return of the King",
      "subtitle": "",
      "authors": [
          "J. R. R. Tolkien"
      ],
      "publishedDate": "2009-04-20",
      "description": "All three parts of the epic masterpiece The Lord of the Rings – The Fellowship of the Ring, The Two Towers & The Return of the King – available as one download, featuring the definitive edition of the text, hyperlinked footnotes and page references, and 3 maps including a detailed map of Middle-earth.",
      "pageCount": 1227,
      "categories": [
          "Fiction"
      ],
      "thumbnail": "http://books.google.com/books/content?id=FKziXsnqLTEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      "language": "en",
      "listPrice": {
          "amount": 100,
          "currencyCode": "🚫(From Google)",
          "isOnSale": false
      },
      "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=FKziXsnqLTEC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=FKziXsnqLTEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      "id": "ZiLSh"
  },
  {
      "title": "The Fellowship of the Ring (The Lord of the Rings, Book 1)",
      "subtitle": "",
      "authors": [
          "J. R. R. Tolkien"
      ],
      "publishedDate": "2009-04-20",
      "description": "The first part of J. R. R. Tolkien’s epic adventure THE LORD OF THE RINGS ‘A most remarkable feat’ Guardian",
      "pageCount": 442,
      "categories": [
          "Fiction"
      ],
      "thumbnail": "http://books.google.com/books/content?id=xFr92V2k3PIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      "language": "en",
      "listPrice": {
          "amount": 100,
          "currencyCode": "🚫(From Google)",
          "isOnSale": false
      },
      "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=xFr92V2k3PIC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=xFr92V2k3PIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      "id": "XCHEg"
  },
  {
      "title": "Harry Potter and the Sorcerer's Stone",
      "subtitle": "",
      "authors": [
          "J.K. Rowling"
      ],
      "publishedDate": "2015-12-08",
      "description": "Turning the envelope over, his hand trembling, Harry saw a purple wax seal bearing a coat of arms; a lion, an eagle, a badger and a snake surrounding a large letter 'H'. Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin! Having become classics of our time, the Harry Potter eBooks never fail to bring comfort and escapism. With their message of hope, belonging and the enduring power of truth and love, the story of the Boy Who Lived continues to delight generations of new readers.",
      "pageCount": 311,
      "categories": [
          "Juvenile Fiction"
      ],
      "thumbnail": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      "language": "en",
      "listPrice": {
          "amount": 100,
          "currencyCode": "🚫(From Google)",
          "isOnSale": false
      },
      "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      },
      "id": "ZWWJk"
  },
  {
      "title": "The Irresistible Rise of Harry Potter",
      "subtitle": "",
      "authors": [
          "Andrew Blake"
      ],
      "publishedDate": "2002-12-17",
      "description": "Blake's examination of the Potter phenomenon raises serious questions about the condition of the publishing industry, filmmaking, and the ways in which the Potter consumer campaign has changed ideas about literature and reading.",
      "pageCount": 140,
      "categories": [
          "Language Arts & Disciplines"
      ],
      "thumbnail": "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      "language": "en",
      "listPrice": {
          "amount": 100,
          "currencyCode": "🚫(From Google)",
          "isOnSale": false
      },
      "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      "id": "tMbDH"
  },
  {
      "title": "Harry Potter and the Deathly Hallows",
      "subtitle": "",
      "authors": [
          "J. K. Rowling"
      ],
      "publishedDate": "2007",
      "description": "\"The final adventure in J.K. Rowling's phenomenal, best-selling Harry Potter book series\"--Provided by publisher.",
      "pageCount": 792,
      "categories": [
          "Bildungsromans"
      ],
      "thumbnail": "http://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      "language": "en",
      "listPrice": {
          "amount": 100,
          "currencyCode": "🚫(From Google)",
          "isOnSale": false
      },
      "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      },
      "id": "hLmV4"
  },
  {
      "title": "The Irresistible Rise of Harry Potter",
      "subtitle": "",
      "authors": [
          "Andrew Blake"
      ],
      "publishedDate": "2002-12-17",
      "description": "Blake's examination of the Potter phenomenon raises serious questions about the condition of the publishing industry, filmmaking, and the ways in which the Potter consumer campaign has changed ideas about literature and reading.",
      "pageCount": 140,
      "categories": [
          "Language Arts & Disciplines"
      ],
      "thumbnail": "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      "language": "en",
      "listPrice": {
          "amount": 100,
          "currencyCode": "🚫(From Google)",
          "isOnSale": false
      },
      "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      "id": "FAWCr"
  },
  {
      "title": "Modern JavaScript Web Development Cookbook",
      "subtitle": "",
      "authors": [
          "Federico Kereki"
      ],
      "publishedDate": "2018-12-26",
      "description": "Over 90 recipes to help you write clean code, solve common JavaScript problems, and work on popular use cases like SPAs, microservices, native mobile development with Node, React, React Native and Electron. Key FeaturesOver 90 practical recipes to help you write clean and maintainable JavaScript codes with the latest ES8Leverage the power of leading web frameworks like Node and React to build modern web appsFeatures comprehensive coverage of tools and techniques needed to create multi-platform apps with JavaScriptBook Description JavaScript has evolved into a language that you can use on any platform. Modern JavaScript Web Development Cookbook is a perfect blend of solutions for traditional JavaScript development and modern areas that developers have lately been exploring with JavaScript. This comprehensive guide teaches you how to work with JavaScript on servers, browsers, mobile phones and desktops. You will start by exploring the new features of ES8. You will then move on to learning the use of ES8 on servers (with Node.js), with the objective of producing services and microservices and dealing with authentication and CORS. Once you get accustomed to ES8, you will learn to apply it to browsers using frameworks, such as React and Redux, which interact through Ajax with services. You will then understand the use of a modern framework to develop the UI. In addition to this, development for mobile devices with React Native will walk you through the benefits of creating native apps, both for Android and iOS. Finally, you’ll be able to apply your new-found knowledge of server-side and client-side tools to develop applications with Electron. What you will learnUse the latest features of ES8 and learn new ways to code with JavaScriptDevelop server-side services and microservices with Node.jsLearn to do unit testing and to debug your codeBuild client-side web applications using React and ReduxCreate native mobile applications for Android and iOS with React NativeWrite desktop applications with ElectronWho this book is for This book is for developers who want to explore the latest JavaScript features, frameworks, and tools for building complete mobile, desktop and web apps, including server and client-side code. You are expected to have working knowledge of JavaScript to get the most out of this book.",
      "pageCount": 632,
      "categories": [
          "Computers"
      ],
      "thumbnail": "http://books.google.com/books/content?id=y52BDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      "language": "en",
      "listPrice": {
          "amount": 100,
          "currencyCode": "🚫(From Google)",
          "isOnSale": false
      },
      "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=y52BDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=y52BDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      "id": "rj7B8"
  },
  {
      "title": "JavaScript by Example",
      "subtitle": "",
      "authors": [
          "Ellie Quigley"
      ],
      "publishedDate": "2004",
      "description": "This is the definitive JavaScript tutorial for the serious nonprogrammer who is interested in mastering the full power of the language. Includes hundreds of example JavaScript programs that demonstrate both the fun and practical aspects.",
      "pageCount": 756,
      "categories": [
          "Computers"
      ],
      "thumbnail": "http://books.google.com/books/content?id=IAJv2N1n9JAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      "language": "en",
      "listPrice": {
          "amount": 100,
          "currencyCode": "🚫(From Google)",
          "isOnSale": false
      },
      "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=IAJv2N1n9JAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=IAJv2N1n9JAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      "id": "trdpm"
  }
]



export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy,
    addBook,
    getEmptyReview,
    addReview,
    getGoogleApi,
    getDemoDataGoogle
}

_createBooks()

// For Debug obly
window.bs = bookService

function query(filterBy = getFilterBy()){
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            if (filterBy.page) {
                books = books.filter(book => book.pageCount >= filterBy.page)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
      .then(book => _setNextPrevBookId(book))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY,bookId)
}

function save(book) {
  console.log(book);
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getFilterBy() {
    return {...gFilterBy}
}

function setFilterBy (filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.price !== undefined) gFilterBy.price
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
    .then(books => {
        var idx = books.findIndex(book => book.id === bookId)
        if (idx === books.length -1) idx = -1
        return books[idx+1].id
    })
}

function addBook(newBook) {
    newBook = {...newBook}
    newBook = {...getEmptyBook(),...newBook}
    const price = newBook.price
    newBook.listPrice.amount = price
    storageService.post(BOOK_KEY,newBook).then(console.log('done'))
}

function getEmptyBook() {
  return {
      title: '',
      subtitle: '',
      authors: ['Barbara Cartland'],
      publishedDate: utilService.getRandomIntInclusive(1950,2024),
      description: utilService.makeLorem(),
      pageCount: utilService.getRandomIntInclusive(50,1000),
      categories: [
          'Computers',
          'Hack'
      ],
      thumbnail: `./assets/img/${utilService.getRandomIntInclusive(1,20)}.jpg`,
      language: "en",
      listPrice: {
          amount: 0,
          currencyCode: "USD",
          isOnSale: false
      }
  }
}

function addReview(bookId,review){
  review.id = utilService.makeId()
  return get(bookId)
    .then((book) => {
      if (!book.review) book.review = []
      book.review.push(review)
      console.log(book);
      return book
    })
    .then((book) => save(book))
    .then((book) => {
      console.log('book added', book);
      return book
    })
}

// function removeReview(book,reviewId){
//   // review.id = utilService.makeId()
//   return get(bookId)
//     .then((book) => {
//       // if (!book.review) book.review = []
//       book.review.push(review)
//       console.log(book);
//       return book
//     })
//     .then((book) => save(book))
//     .then((book) => {
//       console.log('book added', book);
//       return book
//     })

// }

function getEmptyReview(){
  return {
    fullName:'',
    freeText: '',
    rate: 1,
    readAt: ''
  }
}

function getDemoDataGoogle(){
  return [
    {
        "kind": "books#volume",
        "id": "KAXfDwAAQBAJ",
        "etag": "GeA8E1QvF1s",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/KAXfDwAAQBAJ",
        "volumeInfo": {
            "title": "Harry's Apology",
            "authors": [
                "David Martin Anderson"
            ],
            "publisher": "ConRoca Publishing",
            "publishedDate": "2019-11-30",
            "description": "Harry Kaplonsky is a veteran of World War II, a survivor of the USS Houston's sinking in the South Pacific, and one of the few men still alive who can recount in detail the one thousand and fifteen days of captivity in the notorious Omori POW prison south of Tokyo. It is there Harry was tortured and beaten and witnessed countless atrocities including the murder of his best friend, Curly. Only problem, Harry can't seem to erase the event from his memories, and he sure can't seem to forgive his captors for the barbaric things which took place during his imprisonment. Now, sixty years later, he's angry and on a mission to sue the Obuchi government for an apology. Since his liberation in August, 1945, Harry's life has been spiraling downward, highlighted by one failed relationship after another, five marriages in total, all marred by battering and cruelty. For Harry the suit is more than a legal means to even the score, it is the last opportunity to lay blame for his own failings. Only days from death, Harry's litigation appears to be lapsing with his demise unless he can convince one of the other four Omori survivors to collaborate in the litigation. Unfortunately, all four despise him and won't enjoin the suit. Furthermore, the U.S. government is siding with the Japanese in hopes of winning trade concessions, and vows to fight Harry to the end. The government's legal team is led by none other than Harry's bastard son, Harold, turning the legal battle into a nasty family affair. All appears to be going adversely against the old veteran. Enter Tinker, an aspiring author in the throws of a literary dry spell. She is searching for the one great story (oddly, a non-fiction piece) to turn her fledgling career around. It is the television interview with Harry by Larry King, however, that motivates her into journeying to Texas for the annual USS Houston survivors' reunion and a shot at the rights to Harry's story. A victim of childhood physical abuse herself, Tinker's past soon becomes intertwined with Harry's, the battering both experienced providing common ground. During the course of the interview, Tinker discovers the dark secrets surrounding Harry and his seeming culpability in the deaths of five crewmates. It is this connection which has created a schism between Harry and the last of the Omori survivors. In the end, Tinker must not only reunite the five Omori brothers, she must also come to terms with her own past and forgive her estranged father.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9781892617156"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "1892617153"
                }
            ],
            "readingModes": {
                "text": false,
                "image": true
            },
            "pageCount": 216,
            "printType": "BOOK",
            "categories": [
                "Fiction"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.0.1.0.preview.1",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=KAXfDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=KAXfDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=KAXfDwAAQBAJ&pg=PT244&dq=harry&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=KAXfDwAAQBAJ&dq=harry&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Harry_s_Apology.html?hl=&id=KAXfDwAAQBAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/Harry_s_Apology-sample-pdf.acsm?id=KAXfDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=KAXfDwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "... <b>Harry</b> found a burnt speaker wire, spliced it, and the device began working as good as ever. For <b>Harry</b> the fix was simple but for Fuji it had been a stroke of sheer genius—yon jú san, anata ga atama ga ii, <b>Harry</b>-san (Forty-three seconds&nbsp;..."
        }
    },
    {
        "kind": "books#volume",
        "id": "fzutDwAAQBAJ",
        "etag": "kmywYGImBCw",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/fzutDwAAQBAJ",
        "volumeInfo": {
            "title": "Harry's War - The True Story of the Soldier Prince",
            "authors": [
                "Robert Jobson"
            ],
            "publisher": "Kings Road Publishing",
            "publishedDate": "2008-06-11",
            "description": "On February 28, 2008, to great international surprise, the British Ministry of Defense released a statement acknowledging that Prince Harry, son of the late Princess Diana and third in line to the British throne, had secretly been deployed to Afghanistan. Subsequent reports revealed that the prince had killed up to thirty Taliban insurgents in directing at least three air strikes, and that he had helped Gurkha troops repel a ground attack of Taliban insurgents using a machine gun. On February 29, Prince Harry was withdrawn from the country with distinction via a covert SAS deployment. This is the amazing story of the first British royal to serve his country in 25 years and his 10 heroic weeks of combat.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9781782195078"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "1782195076"
                }
            ],
            "readingModes": {
                "text": true,
                "image": true
            },
            "pageCount": 206,
            "printType": "BOOK",
            "categories": [
                "Biography & Autobiography"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.3.3.0.preview.3",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=fzutDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=fzutDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=fzutDwAAQBAJ&pg=PT114&dq=harry&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=fzutDwAAQBAJ&dq=harry&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Harry_s_War_The_True_Story_of_the_Soldie.html?hl=&id=fzutDwAAQBAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/Harry_s_War_The_True_Story_of_the_Soldie-sample-epub.acsm?id=fzutDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/Harry_s_War_The_True_Story_of_the_Soldie-sample-pdf.acsm?id=fzutDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=fzutDwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "... <b>Harry</b> , too . Was he <b>Harry&#39;s</b> father ? Yes they both had red hair , but , as we have seen , so did most of <b>Harry&#39;s</b> maternal family . In 2002 Hewitt did his best to dispel the rumours once and for all . In an interview with the tabloid&nbsp;..."
        }
    },
    {
        "kind": "books#volume",
        "id": "KYVRDwAAQBAJ",
        "etag": "BNiqBNOA0M4",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/KYVRDwAAQBAJ",
        "volumeInfo": {
            "title": "Harry's Lovely Spring Day",
            "subtitle": "Teaching children the value of kindness.",
            "authors": [
                "N.G.K."
            ],
            "publisher": "N.G.K. Media",
            "publishedDate": "2018-03-17",
            "description": "Book 1 in the worldwide bestselling 'Harry The Happy Mouse' series. A great way to teach children the value of kindness, used in schools around the world! We see the start of the 'Harry The Happy Mouse' series as Harry learns about the value of kindness, and why a small thing for someone could mean something big for someone else. Harry is living in the city when he is helped by a stranger. Harry then decides to find the stranger to thank her. It really does turn out to be a Lovely Spring Day!",
            "readingModes": {
                "text": false,
                "image": true
            },
            "pageCount": 36,
            "printType": "BOOK",
            "categories": [
                "Juvenile Nonfiction"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "preview-1.0.0",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=KYVRDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=KYVRDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=KYVRDwAAQBAJ&pg=PP1&dq=harry&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=KYVRDwAAQBAJ&dq=harry&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Harry_s_Lovely_Spring_Day.html?hl=&id=KYVRDwAAQBAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/Harry_s_Lovely_Spring_Day-sample-pdf.acsm?id=KYVRDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=KYVRDwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "... <b>Harry</b> The Christmas Mouse <b>Harry</b> The Happy Mouse #1 Bestseller From the International looselling series #1 Paperback <b>Harry</b> he topoulouse o <b>Harry&#39;s</b> Lovely Spring Dag ng K. - N Ilustrated by *S ESISEIIER k: gs. V ))&quot;. Z – Öanelle Disnomett&nbsp;..."
        }
    },
    {
        "kind": "books#volume",
        "id": "QTpcAAAAcAAJ",
        "etag": "Jkn5WMLYI3g",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/QTpcAAAAcAAJ",
        "volumeInfo": {
            "title": "My vis-à-vis; or, Harry's account of his courtship, and other poems",
            "authors": [
                "Mary Eliza Rogers"
            ],
            "publishedDate": "1865",
            "industryIdentifiers": [
                {
                    "type": "OTHER",
                    "identifier": "BL:A0018570010"
                }
            ],
            "readingModes": {
                "text": false,
                "image": true
            },
            "pageCount": 204,
            "printType": "BOOK",
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.4.4.0.full.1",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=QTpcAAAAcAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=QTpcAAAAcAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=QTpcAAAAcAAJ&pg=PA45&dq=harry&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
            "infoLink": "https://play.google.com/store/books/details?id=QTpcAAAAcAAJ&source=gbs_api",
            "canonicalVolumeLink": "https://play.google.com/store/books/details?id=QTpcAAAAcAAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "FREE",
            "isEbook": true,
            "buyLink": "https://play.google.com/store/books/details?id=QTpcAAAAcAAJ&rdid=book-QTpcAAAAcAAJ&rdot=1&source=gbs_api"
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "ALL_PAGES",
            "embeddable": true,
            "publicDomain": true,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false,
                "downloadLink": "http://books.google.com/books/download/My_vis_%C3%A0_vis_or_Harry_s_account_of_his.epub?id=QTpcAAAAcAAJ&hl=&output=epub&source=gbs_api"
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=QTpcAAAAcAAJ&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "FULL_PUBLIC_DOMAIN",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "... <b>Harry</b> , But she will not hear a word About his marrying me ; she says , &quot; It&#39;s perfectly absurd ! &quot; <b>Harry</b> has gone to see Papa , He&#39;s at the Porte , you know , And Pa has given his consent , He does like <b>Harry</b> so . Until it all was&nbsp;..."
        }
    },
    {
        "kind": "books#volume",
        "id": "Aaug_RnI-xQC",
        "etag": "qJTA1nZgA6Q",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/Aaug_RnI-xQC",
        "volumeInfo": {
            "title": "The Irresistible Rise of Harry Potter",
            "authors": [
                "Andrew Blake"
            ],
            "publisher": "Verso",
            "publishedDate": "2002-12-17",
            "description": "Blake's examination of the Potter phenomenon raises serious questions about the condition of the publishing industry, filmmaking, and the ways in which the Potter consumer campaign has changed ideas about literature and reading.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "1859846661"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9781859846667"
                }
            ],
            "readingModes": {
                "text": false,
                "image": true
            },
            "pageCount": 140,
            "printType": "BOOK",
            "categories": [
                "Language Arts & Disciplines"
            ],
            "averageRating": 5,
            "ratingsCount": 3,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "1.4.4.0.preview.1",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=Aaug_RnI-xQC&printsec=frontcover&dq=harry&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=Aaug_RnI-xQC&dq=harry&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/The_Irresistible_Rise_of_Harry_Potter.html?hl=&id=Aaug_RnI-xQC"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/The_Irresistible_Rise_of_Harry_Potter-sample-pdf.acsm?id=Aaug_RnI-xQC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=Aaug_RnI-xQC&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "Blake&#39;s examination of the Potter phenomenon raises serious questions about the condition of the publishing industry, filmmaking, and the ways in which the Potter consumer campaign has changed ideas about literature and reading."
        }
    },
    {
        "kind": "books#volume",
        "id": "f6y2_oFOcjQC",
        "etag": "OBIo2o9ehDQ",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/f6y2_oFOcjQC",
        "volumeInfo": {
            "title": "The Making of the Potterverse",
            "subtitle": "A Month-by-Month Look at Harry's First 10 Years",
            "authors": [
                "Scott Thomas"
            ],
            "publisher": "ECW/ORIM",
            "publishedDate": "2007-04-01",
            "description": "Experience the magic again with this chronicle of the young wizard who took the world by storm! From the moment that J. K. Rowling conceived the idea of Harry Potter during a train ride, until the 1997 UK publication of Harry Potter and the Philosopher’s Stone, The Making of the Potterverse tells the history of one of today’s most beloved sagas—in print, on screen, and in real life as waves of Pottermania swept fans young and old. Covering the phenomenon through the theatrical release of Harry Potter and the Order of the Phoenix, this book covers all of the major and minor news events centering on the world of Harry Potter, interweaving quotes from the films’ cast and crew members—among them Daniel Radcliffe, Emma Watson, and Rupert Grint; directors Chris Columbus (The Sorcerer’s Stone, The Chamber of Secrets), Alfonso Cuarón (The Prisoner of Azkaban), and Mike Newell (The Goblet of Fire); producer David Heyman, and behind-the-scenes personnel who bring the magic to life.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9781554902880"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "1554902886"
                }
            ],
            "readingModes": {
                "text": true,
                "image": true
            },
            "pageCount": 227,
            "printType": "BOOK",
            "categories": [
                "Literary Criticism"
            ],
            "averageRating": 5,
            "ratingsCount": 2,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "0.7.5.0.preview.3",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=f6y2_oFOcjQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=f6y2_oFOcjQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=f6y2_oFOcjQC&printsec=frontcover&dq=harry&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=f6y2_oFOcjQC&dq=harry&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/The_Making_of_the_Potterverse.html?hl=&id=f6y2_oFOcjQC"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/The_Making_of_the_Potterverse-sample-epub.acsm?id=f6y2_oFOcjQC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/The_Making_of_the_Potterverse-sample-pdf.acsm?id=f6y2_oFOcjQC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=f6y2_oFOcjQC&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "Covering the phenomenon through the theatrical release of Harry Potter and the Order of the Phoenix, this book covers all of the major and minor news events centering on the world of Harry Potter, interweaving quotes from the films’ cast ..."
        }
    },
    {
        "kind": "books#volume",
        "id": "crUNM3YUJCQC",
        "etag": "8Jx7T16THfs",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/crUNM3YUJCQC",
        "volumeInfo": {
            "title": "The Book of Harry Potter Trifles, Trivias & Particularities",
            "authors": [
                "Racheline Maltese"
            ],
            "publisher": "Sterling & Ross Publishers",
            "publishedDate": "2007",
            "description": "Tests the knowledge of Harry Potter fans with a series of quests, each divided by three skill levels, using the Harry Potter series and two books written by J.K. Rowling for charity as guides.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9780977954520"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "0977954528"
                }
            ],
            "readingModes": {
                "text": false,
                "image": true
            },
            "pageCount": 306,
            "printType": "BOOK",
            "categories": [
                "Children's stories, English"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.1.2.0.preview.1",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=crUNM3YUJCQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=crUNM3YUJCQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=crUNM3YUJCQC&printsec=frontcover&dq=harry&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=crUNM3YUJCQC&dq=harry&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/The_Book_of_Harry_Potter_Trifles_Trivias.html?hl=&id=crUNM3YUJCQC"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/The_Book_of_Harry_Potter_Trifles_Trivias-sample-pdf.acsm?id=crUNM3YUJCQC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=crUNM3YUJCQC&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "Tests the knowledge of Harry Potter fans with a series of quests, each divided by three skill levels, using the Harry Potter series and two books written by J.K. Rowling for charity as guides."
        }
    },
    {
        "kind": "books#volume",
        "id": "c0p2E-jkEw0C",
        "etag": "b1+shfWllYA",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/c0p2E-jkEw0C",
        "volumeInfo": {
            "title": "Good vs. Evil in Harry Potter",
            "authors": [
                "Sarah Müller"
            ],
            "publisher": "GRIN Verlag",
            "publishedDate": "2008-05-20",
            "description": "Seminar paper from the year 2008 in the subject English Language and Literature Studies - Literature, grade: 2, University of Frankfurt (Main), language: English, abstract: Harry Potter is a heptalogy of fantasy novels by the English author Joanne K. Rowling about an adolescent boy named Harry Potter, first published in England in 1997. Harry Potter attends the Hogwarts School of Witchcraft and Wizardry, a boarding school for young wizards and witches. Up to his eleventh birthday his cruel relatives, the Dursleys, have raised the orphaned Harry. On this day he learns that he is a wizard and has been invited to attend Hogwarts. The story is mostly set on the school premises, with each of the seven volumes describing a school year at Hogwarts and a year of Harry's growing-up. The main topic is Harry Potter's fight against the evil wizard Lord Voldemort who killed Harry's parents when he was still an infant. Throughout the story the Dark Lord Voldemort gains more and more power and tries to kill Harry several times. In Hallows the climax is reached and the final battle between Harry and Lord Voldemort which will decide the future of the wizarding world. The fight of good versus evil is one of the oldest topics of mankind. Starting with the original sin in the Garden of Eden this fight has dominated moral concepts of the Christian world ever since. This paper presents an analysis of how good and evil are portrayed and presented in the Harry Potter series. First, there is a description of Christian motifs in the series and how these motifs can be compared to certain characters in the books. Second, 'good' characters such as Harry's close friends Ron and Hermione, and Harry's mentor, Professor Dumbledore, are described and characterised as to why they are part of the 'good'. Third, the 'evil' opponents Draco Malfoy and the evil Dark Lord Voldemort are analysed as to how they exhibit 'evil' behaviour. The last chapter deals with the question of whether Harry Potter is 'good' or 'evil' as he does not always act as an exemplary student.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9783638050265"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "3638050262"
                }
            ],
            "readingModes": {
                "text": true,
                "image": true
            },
            "pageCount": 28,
            "printType": "BOOK",
            "categories": [
                "Literary Criticism"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "1.17.17.0.preview.3",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=c0p2E-jkEw0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=c0p2E-jkEw0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=c0p2E-jkEw0C&printsec=frontcover&dq=harry&hl=&as_pt=BOOKS&cd=8&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=c0p2E-jkEw0C&dq=harry&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Good_vs_Evil_in_Harry_Potter.html?hl=&id=c0p2E-jkEw0C"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/Good_vs_Evil_in_Harry_Potter-sample-epub.acsm?id=c0p2E-jkEw0C&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/Good_vs_Evil_in_Harry_Potter-sample-pdf.acsm?id=c0p2E-jkEw0C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=c0p2E-jkEw0C&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "On this day he learns that he is a wizard and has been invited to attend Hogwarts. The story is mostly set on the school premises, with each of the seven volumes describing a school year at Hogwarts and a year of Harry&#39;s growing-up."
        }
    },
    {
        "kind": "books#volume",
        "id": "VD80DwAAQBAJ",
        "etag": "4/bZzwUk9pk",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/VD80DwAAQBAJ",
        "volumeInfo": {
            "title": "Harry",
            "subtitle": "Life, Loss, and Love",
            "authors": [
                "Katie Nicholl"
            ],
            "publisher": "Hachette UK",
            "publishedDate": "2018-03-20",
            "description": "The most intimate and informative portrait yet of Prince Harry, from royal expert Katie Nicholl, author of the bestselling William and Harry and Kate. From his earliest public appearances as a mischievous redheaded toddler, Prince Harry has captured the hearts of royal enthusiasts around the world. In Harry, Britain's leading expert on the young royals offers an in-depth look at the wayward prince turned national treasure. Nicholl sheds new light on growing up royal, Harry's relationship with his mother, his troubled youth and early adulthood, and how his military service in Afghanistan inspired him to create his legacy, the Invictus Games. Harry: Life, Loss, and Love features interviews with friends, those who have worked with the prince, and former Palace aides. Nicholl explores Harry's relationship with his family, in particular, the Queen, his father, stepmother, and brother, and reveals his secret \"second family\" in Botswana. She uncovers new information about his former girlfriends and chronicles his romance and engagement to American actress Meghan Markle. Harry is a compelling portrait of one of the most popular members of the royal family, and reveals the inside story of the most intriguing royal romance in a decade.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9781602865273"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "1602865272"
                }
            ],
            "readingModes": {
                "text": true,
                "image": false
            },
            "pageCount": 272,
            "printType": "BOOK",
            "categories": [
                "Biography & Autobiography"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "1.12.12.0.preview.2",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=VD80DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=VD80DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=VD80DwAAQBAJ&printsec=frontcover&dq=harry&hl=&as_pt=BOOKS&cd=9&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=VD80DwAAQBAJ&dq=harry&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Harry.html?hl=&id=VD80DwAAQBAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/Harry-sample-epub.acsm?id=VD80DwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=VD80DwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "Harry is a compelling portrait of one of the most popular members of the royal family, and reveals the inside story of the most intriguing royal romance in a decade."
        }
    },
    {
        "kind": "books#volume",
        "id": "AqYU7NljeqYC",
        "etag": "KoK+m1n2l7w",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/AqYU7NljeqYC",
        "volumeInfo": {
            "title": "Friends and Foes of Harry Potter-Names Decoded(Hard Cover)",
            "publisher": "Texas World Publishing",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9780977231003"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "0977231003"
                }
            ],
            "readingModes": {
                "text": false,
                "image": true
            },
            "pageCount": 162,
            "printType": "BOOK",
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "1.2.2.0.preview.1",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=AqYU7NljeqYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=AqYU7NljeqYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=AqYU7NljeqYC&printsec=frontcover&dq=harry&hl=&as_pt=BOOKS&cd=10&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=AqYU7NljeqYC&dq=harry&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Friends_and_Foes_of_Harry_Potter_Names_D.html?hl=&id=AqYU7NljeqYC"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/Friends_and_Foes_of_Harry_Potter_Names_D-sample-pdf.acsm?id=AqYU7NljeqYC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=AqYU7NljeqYC&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        }
    }
]
}

function getGoogleApi(bookTitle){
  return `
  https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookTitle}
  `
}

// Private funcs

function _createBooks(){
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length){
        // books = books.getBooks()
        // books.push(_createBook())
        // books.push(_createBook())
        // books.push(_createBook())
        books = gBooks
        
        console.log(books);
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _setNextPrevBookId(book){
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
  })
}
