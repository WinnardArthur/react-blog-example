import { getArticles } from '@polyblog/polyblog-js-client';
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import './single.scss';
import { useLocation, Link } from 'react-router-dom';
import moment from 'moment';


const Single = () => {
    const {pathname: location} = useLocation()
    const [article, setArticle] = useState()
    const slug = location.split("/")[2]
    const locale = location.split("/")[1]
    console.log("location:", location)
    console.log("locale: ", locale)
    console.log("slug: ", slug)

    useEffect(() => {

        if (article) return 
        const fetchArticles = async() => {
            let articles = await getArticles({
                organizationId: 'c398463407b5c12f27f9aed4',
                project: 'polyblog',
                locale,
                slugLocalized: slug,
            })
            console.log({articles})
            let singleArticle = articles?.[0]
            setArticle(singleArticle)

        }

        fetchArticles()
    }, [article, locale, slug])

    return (
        <div className="single">
            <div className="singleBlogTop">
                <div className="singleBlogHeader">
                    <h3>Polyblog Blog</h3>
                    <ul>
                        <Link className="link" to="#">POLYBLOG</Link>
                        <Link className="link" to="#">MARKETING</Link>
                        <Link className="link" to="#">DESIGN</Link>
                        <Link className="link" to="#">MANAGEMENT</Link>
                        <Link className="link" to="#">TECHNOLOGY</Link>
                        <Link className="link" to="#">ENGLISH</Link>
                    </ul>
                </div>
                <img src={article?.coverUrl} alt={article?.title} />
                <div className="singleBlogHeaderOverlay"></div>
                <div className="singleBlogHero">
                    <h1>{article?.title}</h1>
                    <h3>{article?.subtitle}</h3>
                    <i>Posted by <span>{article?.author}</span> on <span>{moment(article?.creationTime).format('MMMM D, YYYY')}</span></i>
                </div>
            </div>
            <div className="singleBlogBody">
            <div className="singleBlogContent">
               {article?.content}
            </div>
        </div>
            <Footer />
        </div>
    )
}

export default Single
