import React, { useState, useRef, useEffect } from 'react';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { confirmAlert } from 'react-confirm-alert';
import Card from './Card';
import axios from 'axios';
import { useAlert } from 'react-alert';
import ReactHtmlParser from 'react-html-parser';

const Update = ({article, setPage}) => {
    const editor = useRef('');
    const [stranica, setStranica] = useState(0);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState(article.title);
    const [author, setAuthor] = useState(article.author);
    const [category, setCategory] = useState(article.category);
    const [url, setUrl] = useState(article.articleImage);
    const [text, setText] = useState(article.text);
    const [img, setImg] = useState(null)
    const [imgur, setImgur] = useState('');
    const alert = useAlert();
    let akisasus = [], index = 0;

    useEffect(() => {
        axios.get('/category/get')
            .then(res => {
                if(res.status === 200) {
                    setCategories(res.data)
                }
            }).catch(err => console.error(err));
    }, []);

    const uploadImageHandler = () => {
        const formData = new FormData();
        //8f873fefbd4cb50 6d1977a34695e99471cd07c1d4a26069dc60930e
        formData.append("image", img);
        fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: "Client-ID 8f873fefbd4cb50",
                Accept: "application/json",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                setImgur(response.data);
                setUrl(response.data.link)
            });

    }
    const handleChange = (model) => {
        setText(model);
    }
    const deleteHandler = () => {
        axios.delete(`/article/delete/${article._id}`)
            .then(res => {
                alert.show('Статията е изтрита !', {
                    type: 'success'
                });
                setPage(0);
            }).catch(err => {
                console.log(err);
            })
    }
    const confirmHandler = () => {
        confirmAlert({
            title: 'Потвърди да изтриеш !',
            closeOnEscape: true,
            closeOnClickOutside: true,          
            buttons: [
              {
                label: 'Изтрий',
                onClick: () => {
                    deleteHandler()
                }
              },
              {
                label: 'Отказ',
                onClick: () => {
                    console.log('closed')
                }
              }
            ]
          });
    }
    const fileUpload = e => {
        console.log(e.target.files[0])
        setImg(e.target.files[0])
    }
    const nextHandler = () => {
        setStranica(1);
    };
    const updateHandler = () => {
        axios.put(`/article/update/${article._id}`, { 
            title: title,
            author: author,
            category: category,
            text: text,
            articleImage: url,
            adminName: article.adminName
        }).then(res => {
            if(res.status === 200) {
                alert.show("Статията е променена", {
                    type: 'success'
                })
            }
        }).catch(err => {
            console.error(err);
        })
    };
    return(
        <div  className={stranica === 2 ? 'bc-grey adminc' : 'adminc'}>
            <h1>Промени Статията си</h1>
            {
                stranica === 0 ? (
                    <div className='upload'>
                        <div className='left'>
                            <label>Заглавие</label>
                            <input 
                                type="text" 
                                placeholder='Заглавие' 
                                className='input'
                                value={title}
                                onChange={(e)=> {setTitle(e.target.value)}}
                            />
                            <label>Автор</label>
                            <input 
                                type="text" 
                                placeholder='Автор' 
                                className='input'
                                value={author}
                                onChange={(e)=> {setAuthor(e.target.value)}}
                            />
                            <label>Категория</label>
                            <select 
                                name='category' 
                                className='select'
                                onChange={(e)=> {setCategory(e.target.value)}}
                            >
                                <option value=''>Категория</option>
                                {
                                    categories.map(category => {
                                        return (
                                            <option key={category._id} value={category.name}>{category.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label>Снимка</label>
                            <input 
                                type="text" 
                                placeholder='Picture URL' 
                                className='input'
                                value={url}
                                onChange={(e)=> {setUrl(e.target.value)}}
                            />
                             <p>Или</p>
                            <div style={{width: '350px', display: 'flex', alignItems: 'center'}}>
                                <input
                                    type="file"
                                    onChange={fileUpload} 
                                    className='btn-file'
                                />
                                <button className='btn btn-img' onClick={uploadImageHandler}>Прикачи</button>
                            </div>
                        </div>
                        <div className='right'>
                            <Card 
                                title={title}
                                author={author}
                                category={category}
                                url={url}
                                date={article.postDate}
                                article='none'
                                type={0}
                            />
                        </div>
                        <div className='abs'>
                            <button 
                                className="btn" 
                                onClick={() => setPage(0
                                )}>Върни се
                            </button>
                            <button 
                                className="btn" 
                                onClick={nextHandler}>Напред <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>              
                        <button 
                            className="btn btn-red m r" 
                            onClick={confirmHandler}>Изтрий Статията
                        </button>
                    </div>
                ) : stranica === 1 ? (
                    <div>
                      <button 
                            className='btn m l' 
                            onClick={() => setStranica(0)}
                        >Върни се</button>

                        <button
                            style={{top: 0}}
                            onClick={() => setStranica(2)} 
                            className="btn m r"
                        >Напред <i className="fas fa-arrow-right"></i></button>
                        
                        <div className='editor-container'>  
                            <FroalaEditorComponent 
                                config={{
                                    imageUpload: true,
                                    events: {
                                        'image.beforePasteUpload': function (img) {
                                            fetch(img.src)
                                            .then(res => res.blob())
                                            .then(blob => {
                                                const file = new File([blob], 'dot.png', blob)
                                                const formData = new FormData();
                                                formData.append('image', file);
                                                fetch("https://api.imgur.com/3/image", {
                                                method: "POST",
                                                headers: {
                                                    Authorization: "Client-ID 8f873fefbd4cb50",
                                                    Accept: "application/json",
                                                },
                                                body: formData,
                                            })
                                                .then((response) => response.json())
                                                .then((response) => {
                            
                                                    console.log(response.data)
                                                    akisasus.push(response.data.link);
                                                    console.log('push')
                                                    
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                            })
                                        },
                                        'image.loaded': (img) => {
                                            // set once next is hitted (will useState work)
                                            // console.log(clicked)
                                            //   if(clicked) {
                                                setTimeout(() => {
                                                    if(index < akisasus.length){
                                                    // console.log(pastedImg)
                                                        console.log(img[0])
                                                        img[0].setAttribute('src', akisasus[index]);
                                                        console.log(index)
                                                        index++;
                                                        console.log('length: ' + akisasus.length, 'index:' + index);
                                                    }
                                                }, 5500);
                                                // }
                                        },
                                    }
                                }}
                                tag='textarea'
                                model={text} 
                                onModelChange={handleChange}
                                ref={editor}
                            />
                        </div> 
                    </div>
                ) : (
                <div>
                     <button 
                            className='btn m l' 
                            onClick={() => setStranica(1)}
                    >Върни се</button>
                    <button
                        onClick={updateHandler} 
                        style={{top: 0}}
                        className="btn m r"
                    >Промени !</button>
                    <div className='Article bc-grey'>
                        <div className="container">
                            {ReactHtmlParser(text)}
                            <hr />
                            <p className='article-author'>Автор: {author}</p>
                        </div>
                    </div>
                </div>
                )
            }
              
        </div>
    )
}

export default Update;