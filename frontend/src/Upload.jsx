import React, { useRef, useState, useEffect } from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import { useAlert } from 'react-alert';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import Card from './Card';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import 'froala-editor/js/plugins.pkgd.min.js';

const Upload = ({ name, setPage, setText, text, article, setArticle}) => {
    const editor = useRef('');
    const [stranica, setStranica] = useState(0);
    const [urlImages, seturlImages] = useState([]);
    const [title, setTitle] = useState(' ');
    const [categories, setCategories] = useState([]);
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [url, setUrl] = useState('');
    
    const [img, setImg] = useState(null);
    const alert = useAlert();

    useEffect(() => {
        axios.get('/category/get')
            .then(res => {
                if(res.status === 200) {
                    setCategories(res.data)
                }
            }).catch(err => console.error(err));
    }, []);

    const imagesHandler = () => {
        let links = [];
        
        urlImages?.map(async(imageTag, index) => {

            //взима blob url-овете
            let source = imageTag.match(/src="[^"]*" /)[0].replace('src="', '').replace('"', '');
            
            //превръща blob url-овете в blob files
            let blob = await fetch(source).then(r => r.blob());
        
            const formData = new FormData();
            formData.append('image', blob);

            // upload-ва снимките към imgur
            const response = await fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: "Client-ID 8f873fefbd4cb50",
                    Accept: "application/json",
                },
                body: formData,
            });
            const data = await response.json();
            links.push(data.data.link);

            if(links.length == urlImages.length) {
                // here all images are uploaded
                
                let html = text;
                const regex = /src="[^"]*" /gm;
                const searchedValue = html.match(regex);
                let obj = {};
                
                searchedValue.forEach((image, index) => {
                    obj[image] = links[index];
                })
        
                setText(html.replace(regex, function(match) {
                    return `src='${obj[match]}'`;
                }));
                alert.success('Снимките са качени !')
            }
            

        });
    }

    const handleChange = (model) => {
        // взима img таговете от текста.
        setText(model);
        seturlImages(model.match(/<img [^>]*src="[^"]*"[^>]*>/gm));
    }

    const uploadHandler = () => {
        if(category !== '') {
            setArticle({
                title: title,
                author: author,
                category: category,
                text: text,
                articleImage: url,
                adminName: name
            });
            axios.post('/article/post', {
                title: title,
                author: author,
                category: category,
                text: text,
                articleImage: url,
                adminName: name
            }).then(res => {
                alert.show('Статията е публикувана', {
                    type: 'success'
                })
                setTimeout(() => {
                    setAuthor('');
                    setText('');
                    setCategory('');
                    setTitle('');
                    setPage(0)
                }, 1000)
            }).catch(err => {
                alert.show('Попълни всички полета', {
                    type: 'error'
                });
                console.log(err);
            });
        }
    }
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
                setUrl(response.data.link)
            });

    }
    const fileUpload = e => {
        setImg(e.target.files[0])
    }
   
    return( 
        <div className={stranica === 2 ? 'bc-grey adminc' : 'adminc'}>
            <h1>Твоята нова статия</h1>
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
                                placeholder='Линк към снимката' 
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
                                date={Date().now}
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
                                onClick={() => setStranica(1)}>Напред <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
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
                                    placeholderText: 'Твоята статия',
                                }}
                                tag='textarea'
                                model={text} 
                                onModelChange={handleChange}
                                ref={editor}
                            />
                            <button style={{width: '130px'}} title='Качва всичките снимки от статията' className="btn m" onClick={imagesHandler}>Качи снимки</button>
                        </div>
                    </div>
                ) : (
                    <div className='bc-grey'>
                         <button 
                            className='btn m l' 
                            onClick={() => setStranica(1)}
                        >Върни се</button>
                        <button
                            style={{top: 0}}
                            onClick={uploadHandler} 
                            className="btn m r"
                        >Качи !</button>
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

export default Upload;

