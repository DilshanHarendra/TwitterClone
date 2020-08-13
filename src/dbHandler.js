var db;


function exequteQuey(query) {
    var  result= new Promise((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(query);

        },errorhandler,successCB)

        function errorhandler(err) {
            reject(err)
        }

        function successCB() {
            resolve("success");
        }
    });
    return result;
}

function getQueryData(query) {
    var data= new Promise((resolve,reject)=>{ // make promise
        db.transaction(tx=>{
            try {
                tx.executeSql(query,[],(t,results)=>{
                    resolve(results.rows) //set data for promise
                });
            }catch (e) {
                reject(e) // error handle
            }

        })
    });
    return data;

}




const createDatabase= ()=>{
    db = openDatabase('twitter','1.0','myDb',5*1024*1024); // create database
    exequteQuey("CREATE TABLE IF NOT EXISTS  users (uid INTEGER PRIMARY KEY ,username unique, name,profileImg,pass);"
        )
        .then(m=>{})
        .catch(err=>alert(err))

    exequteQuey("CREATE TABLE IF NOT EXISTS  posts (pid INTEGER PRIMARY KEY ,uid , details,postImg,time,FOREIGN KEY(uid) REFERENCES user (uid),unique(uid , details,postImg) )"
    )
        .then(m=>{})
        .catch(err=>alert(err))

    exequteQuey("CREATE TABLE IF NOT EXISTS  retweets (ruid ,rpid, comment,retime,FOREIGN KEY (ruid) REFERENCES user (uid),FOREIGN KEY(rpid) REFERENCES posts (pid),unique(ruid ,rpid) )"
    )
        .then(m=>{})
        .catch(err=>console.log(err))

}

const insertSampleData=()=>{
    exequteQuey("INSERT INTO users (uid,username,name,profileImg,pass) VALUES ( null,'@User','User','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRV72eA4Pfos1uk0fI2HDNogT6i0mXxtSWW2g&usqp=CAU',123),( null,'@User2','User2','http://www.venmond.com/demo/vendroid/img/avatar/big.jpg',123); "
    )
        .then(m=>{})
        .catch(err=>{})
    exequteQuey(`INSERT INTO posts (pid ,uid, details,postImg,time) 
                        values (null,1,'The new Cabinet will be sworn in tomorrow at the Auditorium, Magul Maduwa, in Kandy 28 Cabinet Ministers and 40 State Ministers to be appointed.Live via @GotabayaR Facebook page SriLanka LKA #CabinetSL #GenElecSL','https://beta.techcrunch.com/wp-content/uploads/2017/02/instagram-carousels.gif',DATETIME()),
                        (null,2,'The new Cabinet will be sworn in tomorrow at the Auditorium, Magul Maduwa, in Kandy 28 Cabinet Ministers and 40 State Ministers to be appointed.Live via @GotabayaR Facebook page SriLanka LKA #CabinetSL #GenElecSL','https://beta.techcrunch.com/wp-content/uploads/2017/02/instagram-carousels.gif',DATETIME()),
                         (null,1,'In 2002, the West Indies paceman dismissed legendary India batsman Sachin Tendulkar thrice in the five-Test series at home. Happy birthday to Pedro Collins!','https://farm6.staticflickr.com/5210/14003824662_77a06e83db_o.gif',DATETIME()),
                          (null,1,'A difficult game but a very important point. Keep on fighting until the end 💪🏼 #FinoAllaFine','https://media1.giphy.com/media/sRHVFZVZlHsOBwYTFn/giphy.gif',DATETIME()) `
    )
        .then(m=>{})
        .catch(err=>{})


}




//------------------------------------------------------user handling------------------------------------------------------------------------
const registerUser=(username,name,proImg,password)=>{

 return     exequteQuey(`INSERT INTO users (uid,username,name,profileImg,pass) VALUES ( null,'@${username}','${name}','${proImg}','${password}')`)
}

const getUsers=()=>{
    return getQueryData(`SELECT * FROM users `)

}


//----------------------------------------------------------------post handling--------------------------------------------------


const addNewPost=(userid,details,postImg)=>{

    return exequteQuey(`INSERT INTO posts (pid ,uid, details,postImg,time) VALUES (null,${userid},'${details}','${postImg}',DATETIME())`);

}

const getAllPosts=()=>{
    return getQueryData(`SELECT * FROM posts p, users u WHERE p.uid=u.uid    ORDER BY time DESC `);
                
}
//-------------------------------------------------------ReTweet-----------------------------------------------------------------------

const addReTweet=(userid,postid,message)=>{

    return exequteQuey(`INSERT INTO retweets (ruid ,rpid, comment,retime) VALUES (${userid},${postid},'${message}',DATETIME())`);

}
const getAllRetweet=()=>{
    return getQueryData(`SELECT b.uid as ruid ,b.username as rusername , b.name as rname, b.profileImg as rprofileImg ,b.pass as rpass,r.retime as rtime ,* FROM posts p, users u, retweets r,users b WHERE r.rpid=p.pid AND u.uid=p.uid AND r.ruid=b.uid   ORDER BY time DESC `);

}


export {createDatabase,insertSampleData,registerUser,getUsers,addNewPost,getAllPosts,addReTweet,getAllRetweet};
