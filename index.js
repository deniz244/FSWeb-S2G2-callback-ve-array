const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const fifa2014 = fifaData.filter((evSahibi) => {return evSahibi.Year === 2014 && evSahibi.Stage === "Final" });
console.log(fifa2014);
console.log("fifa2014 Home Team Name:",fifa2014[0]['Home Team Name']);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log("fifa2014 Away Team Name:",fifa2014[0]['Away Team Name']);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log("fifa2014 Home Team Goals:",fifa2014[0]['Home Team Goals']);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log("fifa2014 Away Team Goals:",fifa2014[0]['Away Team Goals']);
//(e) 2014 Dünya kupası finali kazananı*/
if(fifa2014[0]['Home Team Goals'] > fifa2014[0]['Away Team Goals']){
	console.log(fifa2014[0]['Home Team Name']);
}else{
	console.log(fifa2014[0]['Away Team Name']);
}


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(dizi) {

	/*//eleman burada parametre, anonim arrow (=>) function kullandım 

	const finaller = dizi.filter((eleman) => {return eleman.Stage === "Final"} );

	return finaller;*/

	return dizi.filter((eleman) => eleman.Stage === "Final" );


	/*const finaller = [];

	for(let i = 0; i<dizi.length; i++){
		if(dizi[i].Stage === "Final"){
			finaller.push(dizi[i]);
		}
	}
	
    return finaller;*/
}

console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(dizi,finalCB) {

	const years = finalCB(dizi).map((eleman) => eleman.Year)

	return years

}

console.log(Yillar(fifaData,Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(dizi,finalFn) {
	
    const finalMaclar = finalFn(dizi);
	const kazananlar = finalMaclar.map((eleman)=>{
		if(eleman['Home Team Goals'] > eleman['Away Team Goals']){
			return eleman['Home Team Name'];
		}else{
			return eleman['Away Team Name'];
		}
	}); 
	
	return kazananlar;
}

Kazananlar(fifaData,Finaller);

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(dizi,final,yil,kazanan) {
	const finalMaclar = final(dizi);
	const yillarDizisi = yil(finalMaclar,final);
	const kazananlar = kazanan(finalMaclar,final);

	const sonuclarMetin = finalMaclar.map((eleman,index)=>{
		return  yillarDizisi[index] + " yılında, "+ kazananlar[index] + " dünya kupasını kazandı!";
	})
	return sonuclarMetin;
}

YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar)

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(final) {
	
    const macBasiToplamGol = final.map((mac) => {
		return mac["Home Team Goals"] + mac["Away Team Goals"]
	});

	const toplamGol = macBasiToplamGol.reduce((toplam,gol) => {
		return toplam + gol;
	},0);
	
	return (toplamGol/macBasiToplamGol.length).toFixed(2);
}

OrtalamaGolSayisi(Finaller(fifaData));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(dizi,kisaltma) {

	/*let count = 0;
	
    const kupaSayisi = dizi.reduce((eleman,kupa) => {
		if(eleman['Home Team Initials'] === kisaltma && eleman.Stage === "Final"){
			kupa = count++;
			return kupa;
		}
		else if(eleman['Away Team Initials'] === kisaltma && eleman.Stage === "Final"){
			kupa = count++;
			return kupa;
		}
	});

	console.log("kupa sayısı",kupaSayisi); */

	//return  kupaSayisi + "dünya kupası var "
	
}

UlkelerinKazanmaSayilari(fifaData,"ITA");

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(dizi) {
	
    const finaller = dizi.filter((evSahibi) => {return evSahibi.Stage === "Final" });
	const enCokGolAtan = finaller.map((eleman) => {
		if(eleman["Home Team Goals"] > eleman["Away Team Goals"]){
			return eleman["Home Team Name"]
		}else{
			return eleman["Away Team Name"]
		}
	});

	console.log("en çok gol atan", enCokGolAtan[0]);

	return enCokGolAtan[0]
}
EnCokGolAtan(fifaData);

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(dizi) {
	
    const finaller = dizi.filter((evSahibi) => {return evSahibi.Stage === "Final" });
	const enCokGolYiyen = finaller.map((eleman) => {
		if(eleman["Home Team Goals"] < eleman["Away Team Goals"]){
			return eleman["Home Team Name"]
		}else{
			return eleman["Away Team Name"]
		}
	});

	console.log("en çok gol yiyen", enCokGolYiyen);

	return enCokGolYiyen[0]
	
}
EnKotuDefans(fifaData);

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
