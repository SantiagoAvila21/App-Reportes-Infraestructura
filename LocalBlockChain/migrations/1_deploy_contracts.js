const LocationDB = artifacts.require("LocationDatabase");

module.exports = function (deployer) {
  deployer.deploy(LocationDB).then(async (instance) => {
    const locationData = [
      {
        "desc": "Desbordamiento de aguas residuales en una calle residencial",
        "image": "https://periodismopublico.com/wp-content/uploads/2012/07/jpg_alcantarilla.jpg",
        "lat": 469514400,
        "lon": -740454200,
        "name": "Desbordamiento de aguas residuales"
      },
      {
        "desc": "Hueco profundo en una vía principal",
        "image": "https://www.semana.com/resizer/jnnAL3_tXxXWIHl1M5AFhS-qO60=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/T7GJXY6JBNDUPJ3YNKWDMKCVLE.jpeg",
        "lat": 469620700,
        "lon": -740249300,
        "name": "Hueco en la vía"
      },
      {
        "desc": "Inundación en una zona baja cercana al río",
        "image": "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/CJKU372HUBBIDJLRYPXO46PJGY.jpg",
        "lat": 469694400,
        "lon": -740693000,
        "name": "Inundación en la zona baja"
      },
      {
        "desc": "Deslizamiento de tierra en una colina cercana",
        "image": "https://img.lalr.co/cms/2018/12/04172718/COLP_LND_004747-1.jpg?size=xl",
        "lat": 469784400,
        "lon": -740351000,
        "name": "Deslizamiento de tierra"
      },
      {
        "desc": "Poste de luz inclinado en una calle residencial",
        "image": "https://semanarioelmundo.com.ar/wp-content/uploads/2020/01/WhatsApp-Image-2020-01-14-at-3.43.22-PM.jpeg",
        "lat": 469815100,
        "lon": -740432600,
        "name": "Poste de luz inclinado"
      },
      {
        "desc": "Daño en un puente peatonal sobre una autopista",
        "image": "https://www.semana.com/resizer/e9BOl1c_rptq_uKMrRtAhOdMK88=/768x0/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/MFQR3XI2FVHLBH2UF2TLALH7KQ.jpeg",
        "lat": 469886200,
        "lon": -740500200,
        "name": "Daño en puente peatonal"
      },
      {
        "desc": "Fallo en el suministro de agua potable en un barrio residencial, a raíz de obras por un fallo de acueducto",
        "image": "https://www.eltiempo.com/files/image_950_534/uploads/2021/02/02/6019817b66091.jpeg",
        "lat": 469978300,
        "lon": -740376400,
        "name": "Fallo en el suministro de agua"
      },
      {
        "desc": "Derrumbe en una construcción en una zona comercial",
        "image": "https://www.eltiempo.com/files/image_640_428/files/crop/uploads/2022/12/25/63a8c733ae472.r_1672009101579.0-401-1599-1200.png",
        "lat": 470099200,
        "lon": -740679800,
        "name": "Derrumbe en construcción"
      },
      {
        "desc": "Fallo en el semáforo de una intersección importante",
        "image": "https://cloudfront-us-east-1.images.arcpublishing.com/semana/LM5562NESVBZ3IRCHEAWGH4HQM.jpg",
        "lat": 470182800,
        "lon": -740374700,
        "name": "Semáforo dañado"
      },
      {
        "desc": "Vandalismo en un paradero de autobús",
        "image": "https://caracoltv.brightspotcdn.com/dims4/default/2ef775e/2147483647/strip/false/crop/640x427+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fcaracol-brightspot.s3.amazonaws.com%2Fca%2F77%2Ffe4a620649e721970520dfce2ea7%2Fthumb-6364f5f144230b089be80113-1667561084117.jpg",
        "lat": 470229600,
        "lon": -740392300,
        "name": "Vandalismo en paradero de autobús"
      },
      {
        "desc": "Colapso de un muro de contención en una ladera",
        "image": "https://cloudfront-us-east-1.images.arcpublishing.com/semana/FOMCKFAU5VFVXOPFMBNB6WQBTM.jpeg",
        "lat": 470320100,
        "lon": -740682900,
        "name": "Colapso de muro de contención"
      },
      {
        "desc": "Cableado eléctrico caído en un parque público",
        "image": "https://www.cundinamarcaenlinea.com/wp-content/uploads/2023/04/poste-facatativa.jpg",
        "lat": 470389400,
        "lon": -740648100,
        "name": "Cableado eléctrico caído"
      },
      {
        "desc": "Falla en el sistema de alcantarillado en una avenida importante",
        "image": "https://www.eltiempo.com/files/image_950_534/uploads/2019/05/17/5cdeaf0bc5c02.jpeg",
        "lat": 470462200,
        "lon": -740465000,
        "name": "Falla en el alcantarillado"
      },
      {
        "desc": "Fallo en la iluminación de un parque recreativo",
        "image": "https://www.eluniversal.com.co/sites/default/files/201609/oscuridad_en_cartagena_1jpg.jpg",
        "lat": 470528500,
        "lon": -740369000,
        "name": "Fallo en la iluminación del parque"
      },
      {
        "desc": "Baches en una calle secundaria de un barrio",
        "image": "https://www.eltiempo.com/files/image_640_428/uploads/2017/03/06/58be391a6b753.jpeg",
        "lat": 470590000,
        "lon": -740510000,
        "name": "Baches en la calle"
      }
    ]

    for (let i = 0; i < locationData.length; i++) {
      const location = locationData[i];
      await instance.addLocation(
        location.name,
        location.image,
        location.lat,
        location.lon,
        location.desc
      );
      console.log(`Location ${i + 1} created`);
    }
  });
};