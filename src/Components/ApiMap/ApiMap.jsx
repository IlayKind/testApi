import React, { useEffect, useRef, useState } from "react";
import { Map, Polygon, Placemark } from "react-yandex-maps";


export default function ApiMap ({ peaks, setPeaks, polygon, marker, setObjects, polygonState }) {
	
	const myMap = { center: [ 55.344004, 86.120462 ], zoom: 12.5 }            //Центр нашей карты
	const map = useRef(null);                                       //Переменная храняющая значения карты для работы с ней
	const [ ymaps, setYmaps ] = useState(null);                     //Переменная храняющая значения карты для работы с ней
	const [ mark, setMark ] = useState([])                         //Массив с нашими маркерами
	
	//После загрузки страницы мы подгружаем все инструменты для работы с нашей АПИ
	useEffect(() => {
		if ( ymaps && map.current ) {
			const objs = ymaps.geoQuery(mark).addToMap(map.current);
			setObjects(objs);
		}
	}, [ ymaps, map, mark, peaks, marker, polygon ]);
	
	//ф-н для поиска координат по нажатию на точку карты
	const addMark = e => {
		let coords = e.get('coords');
		let obj = {
			type: "Point",
			coordinates: coords
		}
		if ( marker ) {
			setMark([ ...mark, obj ])
		}
		if ( polygon ) {
			setPeaks([ ...peaks, obj ])
		}
	}
	
	return (
		<Map
			style={ { width: "100%", height: "100%" } }
			onClick={
				addMark
			}
			instanceRef={ map }
			modules={ [ "geoQuery" ] }
			state={ myMap }
			onLoad={ (ymapsInstance) => {
				setYmaps(ymapsInstance);
			} }
			options={ { searchControlProvider: "yandex#search" } }
		>
			<Polygon
				instanceRef={ polygonState }
				geometry={ [ peaks.map(item => item.coordinates) ] }
			/>
			{
				mark.map((coordinates, index) => <Placemark
					key={ index }
					geometry={ coordinates.coordinates }
				/>)
			}
		</Map>
	);
}