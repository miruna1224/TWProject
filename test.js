
function extract_images ( i ){
  //Connect to the db
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://localhost:27017/projectDB", {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("projectDB");
      dbo.collection("Images").find({}).toArray(function(err, result) {
      if (err) throw err;
      m = "<img src=";
      m += result[i].path;
      m += `class="memberPhoto">`;
      if ( i == 0 )
        m += `<h4> Buna! <br><br>Eu sunt Floroiu Miruna, studenta la Facultatea de Matematica si Informatica a
            Universitatii Bucuresti.
            <br>Ador sa calatoresc, sa pictez si sa codez :3
            <br><br><a href="https://github.com/miruna1224"></a>
            <a href="https://www.linkedin.com/in/miruna-floroiu-72533216a/"></a>
            <a href="https://www.facebook.com/wT80gH"></a>
        </h4>`;
      else m += `<h4> <br> Hello! <br> <br> Eu sunt Niga Alexandru-Constantin, student la Facultatea de Matematica si Informatica
          a Universitatii din Bucuresti.
          <br>Sunt plin de energie cand sunt inconjurat de oameni faini si ador sa ascult muzica si sa pictez!
          <br><br><a href="https://github.com/alexniga"></a>
          <a href="https://www.linkedin.com/in/alexandru-niga/"></a>
          <a href="https://www.facebook.com/alex.niga.71"></a>
      </h4>`;
      console.log ( m );
      db.close();
    });
  });

}