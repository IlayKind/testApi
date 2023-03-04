import React, { useRef, useState } from 'react';
import './NavigationBarStyle.scss'
import ApiMap from "../ApiMap/ApiMap";


const NavigationBar = () => {
	const [ marker, setMarker ] = useState(false);             // Состояние кнопки маркеров
	const [ polygon, setPolygon ] = useState(false);               // Состояние кнопки выставления вершин полигона
	const [ peaksFigure, setPeaksFigure ] = useState([])           // Массив с координатами полигона для динамического добавления их на карту
	const [ objects, setObjects ] = useState([]);                  // Массив с координатами всех объектов карты
	const [ count, setCount ] = useState(0);                     // счетчик кол-во маркеров попавших в полигон
	const polygonState = useRef(null);                       // Состояние полигона для работы с ним через АПИ
	
	
	
	const markerActive = () => {
		setMarker(!marker)
		setPolygon(false)
	}
	
	const addPolygonMap = () => {
		if ( polygon ) {
			//создаем объект содержащий информацию о результатах поиска в зоне полигона
			const objectsInsidePolygon = objects.searchInside(polygonState.current);
			//добавляем цвет меткам попавшим в полигон
			objectsInsidePolygon.setOptions("preset", "islands#redIcon");
			//Добавляем значение результата в наш счетчик
			setCount(objectsInsidePolygon._objects.length)
			
		} else if ( !polygon ) {
			objects.setOptions("preset", "islands#blueIcon");
			setPeaksFigure([])
			setCount(0)
		}
		setMarker(false)
		setPolygon(!polygon)
	}
	
	return (
		<div className="bar__block">
			<div className="bar__block-map">
				<ApiMap
					peaks={ peaksFigure }
					setPeaks={ setPeaksFigure }
					polygon={ polygon }
					marker={ marker }
					setObjects={ setObjects }
					polygonState={ polygonState }
					objects={objects}
					setCount={setCount}
				/>
			</div>
			<div className="bar__block-nav_group">
				<button onClick={ markerActive }>
					Ставить точки
				</button>
				<button onClick={ addPolygonMap }>
					Рисовать контур
				</button>
				<h3 className="bar__block-info_dot">
					точек в контуре: { count }
				</h3>
			</div>
		</div>
	);
};

export default NavigationBar;
