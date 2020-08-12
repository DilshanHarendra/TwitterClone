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
    exequteQuey("CREATE TABLE IF NOT EXISTS  users (id INTEGER PRIMARY KEY ,username unique, name,profileImg,pass);"
        )
        .then(m=>{})
        .catch(err=>alert(err))

    exequteQuey("CREATE TABLE IF NOT EXISTS  posts (id INTEGER PRIMARY KEY ,userid ,originalUser, details,postImg,time,FOREIGN KEY (originalUser) REFERENCES user (id),FOREIGN KEY(userid) REFERENCES user (id),unique(userid ,originalUser, details,postImg) )"
    )
        .then(m=>{})
        .catch(err=>alert(err))

}

const insertSampleData=()=>{
    exequteQuey("INSERT INTO users (id,username,name,profileImg,pass) VALUES ( null,'@Dilshan123','Dilshan','http://www.venmond.com/demo/vendroid/img/avatar/big.jpg',123),( null,'@Hashini456','Hashini','http://www.venmond.com/demo/vendroid/img/avatar/big.jpg',123); "
    )
        .then(m=>{})
        .catch(err=>{})
    exequteQuey("INSERT INTO posts (id ,userid,originalUser, details,postImg,time)  values (null,1,1,'The new Cabinet will be sworn in tomorrow at the Auditorium, Magul Maduwa, in Kandy 28 Cabinet Ministers and 40 State Ministers to be appointed.Live via @GotabayaR Facebook page SriLanka LKA #CabinetSL #GenElecSL','https://beta.techcrunch.com/wp-content/uploads/2017/02/instagram-carousels.gif',DATETIME()) "
    )
        .then(m=>{})
        .catch(err=>{})


}




//------------------------------------------------------user handling------------------------------------------------------------------------
const registerUser=(username,name,proImg,password)=>{

 return     exequteQuey(`INSERT INTO users (id,username,name,profileImg,pass) VALUES ( null,'@${username}','${name}','${proImg}','${password}')`)
}

const getUsers=()=>{
    return getQueryData(`SELECT * FROM users `)

}


//----------------------------------------------------------------post handling--------------------------------------------------


const addNewPost=(userid,details,postImg)=>{
    console.log(`null,${userid},${userid},'${details}','${postImg}',DATETIME()`)
    return exequteQuey(`INSERT INTO posts (id ,userid,originalUser, details,postImg,time) VALUES (null,${userid},${userid},'${details}','${postImg}',DATETIME()`);

}

const getAllPosts=()=>{
    return getQueryData(`SELECT * FROM posts `);
                
}
//-------------------------------------------------------
//`INSERT INTO users ( id,username,name,profileImg,password) VALUES (null,${username},${name},${proImg},${password})`




export {createDatabase,insertSampleData,registerUser,getUsers,addNewPost,getAllPosts};
