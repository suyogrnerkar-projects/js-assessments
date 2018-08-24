var express = require('express'),
  app = express(),
  PORT = 3001,
  cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.get('/posts', function (req, res) {
  res.send([
    {
      "id": 72607,
      "title": "We Need More Crack-Smoking Mayors Like Rob Ford",
      "publish_at": "2013-11-08 11:15:00",
      "shares": 29,
      "views": 454,
      "image": "http://thumbs.policymic.com/0Ruib7uFmIsP-HJbNZzK08-jBmI=/62x86:1684x1109/500x315/s3.amazonaws.com/policymic-images/77bb1ad82a1847fa37fd6cc8534218e0525fc512759ed5a9196eefb81ebfcbea.jpg",
      "url": "http://www.policymic.com/articles/72607/we-need-more-crack-smoking-mayors-like-rob-ford",
      "words": 164,
      "profile": {
        "id": 352,
        "first_name": "Joseph",
        "last_name": "Sarkisian"
      },
      "tags": [
        {
          "id": 5821,
          "name": "Rob Ford"
        },
        {
          "id": 63999,
          "name": "crack"
        },
        {
          "id": 3055,
          "name": "canada"
        },
        {
          "id": 9855,
          "name": "toronto"
        },
        {
          "id": 33321,
          "name": "mayor"
        }
      ]
    },
    {
      "id": 72593,
      "title": "Miss Universe 2013 Hides A Murky World of Money, Power, and Politics",
      "publish_at": "2013-11-09 08:00:00",
      "shares": 118,
      "views": 2898,
      "image": "http://thumbs.policymic.com/iOk1PXKVpgC44ClAwyYUPJO7UOc=/9x25:964x627/500x315/s3.amazonaws.com/policymic-images/def913fda7feedb03ce7f45462a46b71b96f024b2d6f593c00552f066f03b763.jpg",
      "url": "http://www.policymic.com/articles/72593/miss-universe-2013-hides-a-murky-world-of-money-power-and-politics",
      "words": 1032,
      "profile": {
        "id": 75411,
        "first_name": "John",
        "last_name": "Horne"
      },
      "tags": [
        {
          "id": 83,
          "name": "Human Rights"
        },
        {
          "id": 39345,
          "name": "miss universe"
        },
        {
          "id": 97,
          "name": "Russia"
        },
        {
          "id": 9827,
          "name": "donald trump"
        }
      ]
    },
    {
      "id": 72591,
      "title": "Detroit Homeless Apartments Could Be a Model For All American Cities",
      "publish_at": "2013-11-08 11:41:00",
      "shares": 15,
      "views": 107,
      "image": "http://thumbs.policymic.com/E9mLxPC9w1WgopZR5fGO8UbUw30=/9x197:4712x3164/500x315/s3.amazonaws.com/policymic-images/756fafc51d7277c88e09b6fabfbc95251447881c606cf5efc243df27cffb2015.jpg",
      "url": "http://www.policymic.com/articles/72591/detroit-homeless-apartments-could-be-a-model-for-all-american-cities",
      "words": 215,
      "profile": {
        "id": 66649,
        "first_name": "Eunji",
        "last_name": "Kim"
      },
      "tags": [
        {
          "id": 64461,
          "name": "antisdel apartments"
        },
        {
          "id": 1885,
          "name": "housing"
        },
        {
          "id": 2485,
          "name": "Homelessness"
        },
        {
          "id": 12303,
          "name": "detroit"
        },
        {
          "id": 5137,
          "name": "poverty"
        }
      ]
    },
    {
      "id": 72583,
      "title": "Dear Mr. President: Millennials Voted For Change, But Now You're Just Part Of the Problem",
      "publish_at": "2013-11-08 11:14:00",
      "shares": 190,
      "views": 1929,
      "image": "http://thumbs.policymic.com/6Ds_iNOJvgsAxL-GqhGimr7AHDM=/80x0:2214x1346/500x315/s3.amazonaws.com/policymic-images/ed5871986b5874c55581f964f382be0904890bddb7ef7e6994462d732774f9d2.jpg",
      "url": "http://www.policymic.com/articles/72583/dear-mr-president-millennials-voted-for-change-but-now-you-re-just-part-of-the-problem",
      "words": 734,
      "profile": {
        "id": 89939,
        "first_name": "Andrew ",
        "last_name": "Herrington Gilmore"
      },
      "tags": [
        {
          "id": 557,
          "name": "Obamacare"
        },
        {
          "id": 505,
          "name": "congress"
        },
        {
          "id": 373,
          "name": "president obama"
        }
      ]
    },
    {
      "id": 72579,
      "title": "Evolution? That's Not Real!",
      "publish_at": "2013-11-08 10:58:00",
      "shares": 48,
      "views": 243,
      "image": "http://thumbs.policymic.com/OX8JWqWXBzyvYj7N3TixSquU_iU=/767x7:3692x1851/500x315/s3.amazonaws.com/policymic-images/9dba124e1dd6d3b850852b7d22467038d2d281ecd895379b7f60e5b15df4074c.jpg",
      "url": "http://www.policymic.com/articles/72579/evolution-that-s-not-real",
      "words": 475,
      "profile": {
        "id": 73945,
        "first_name": "Areeba",
        "last_name": "Kamal"
      },
      "tags": [
        {
          "id": 2625,
          "name": "Evolution"
        },
        {
          "id": 135,
          "name": "Science"
        },
        {
          "id": 115,
          "name": "Religion"
        },
        {
          "id": 357,
          "name": "republicans"
        }
      ]
    }
  ]);
});

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT);
});