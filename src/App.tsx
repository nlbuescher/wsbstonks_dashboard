import './App.css';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Jumbotron, Row, Table } from 'react-bootstrap';

import Api, { Portfolio, Stonk } from './api';
import { setTimer, clearTimer } from './util';

function StonkCard(stonk: Stonk, index: number): JSX.Element {
	const diffSign = stonk.diffEuro < 0 ? '' : '+';
	const color = { color: stonk.diffEuro < 0 ? 'red' : 'limegreen' };
	return (
		<Col key={index}>
			<Card text="light" bg="dark">
				<Card.Header>
					<small className="text-muted" style={{ float: 'left' }}>{stonk.symbol}</small>
					<small className="text-muted" style={{ float: 'right' }}>x{stonk.count}</small>
					<br />
					<div>{stonk.name}</div>
				</Card.Header>
				<Card.Body>
					<Table striped borderless variant="dark">
						<tbody>
							<tr>
								<th>Buyin</th>
								<th>Buyin Wert</th>
							</tr>
							<tr>
								<td>{stonk.buyinPrice.format('de-DE', 3)}€</td>
								<td>{stonk.buyinValue.format('de-DE', 2)}€</td>
							</tr>
							<tr>
								<th>Kurs</th>
								<th>Wert</th>
							</tr>
							<tr>
								<td style={color}>{stonk.currentPrice.format('de-DE', 3)}€</td>
								<td style={color}>{stonk.currentValue.format('de-DE', 2)}€</td>
							</tr>
						</tbody>
					</Table>
				</Card.Body>
				<Card.Footer>
					<span style={color}>{diffSign}{stonk.diffEuro.format('de-DE', 2)}€</span>
					<span> (</span>
					<span style={color}>{diffSign}{stonk.diffPercent.format('de-DE', 2)}%</span>
					<span>)</span>
				</Card.Footer>
			</Card>
		</Col>
	);
}

export default function App(): JSX.Element {
	const [portfolio, setPortfolio] = useState(new Portfolio());

	const [stonks, setStonks] = useState<Stonk[]>([]);
	const [stonksTime, setStonksTime] = useState('gar nicht');

	// on mount
	useEffect(() => {
		const timer = setTimer(async () => {
			const { portfolio, stonks, timestamp } = await Api.allStonks();
			const time = new Date(timestamp).toRelativeTime();
			setPortfolio(portfolio);
			setStonks(stonks);
			setStonksTime(time);
		}, 10_000);

		// on unmount
		return () => { clearTimer(timer); };
	}, []);

	const diffSign = portfolio.diffEuro < 0 ? '' : '+';
	const color = { color: portfolio.diffEuro < 0 ? 'red' : 'limegreen' };
	return (
		<div className="App">
			<Jumbotron className="text-light text-center my-4">
				<Container>
					<h1 className="display-2">WSB Stonks Dashboard</h1>
				</Container>
			</Jumbotron>
			<Container>
				<Card text="white" bg="dark">
					<Card.Header>Portfolio</Card.Header>
					<Card.Body className="Portfolio">
						<Table striped borderless variant="dark">
							<tbody>
								<tr>
									<th>Buyin</th>
									<th>Wert</th>
								</tr>
								<tr>
									<td>{portfolio.buyin.format('de-DE', 2)}€</td>
									<td style={color}>{portfolio.value.format('de-DE', 2)}€</td>
								</tr>
							</tbody>
						</Table>
					</Card.Body>
					<Card.Footer>
						<div className="Portfolio">
							<span style={color}>{diffSign}{portfolio.diffEuro.format('de-DE', 2)}€</span>
							<span> (</span>
							<span style={color}>{diffSign}{portfolio.diffPercent.format('de-DE', 2)}%</span>
							<span>)</span>
						</div>
						<small className="text-muted">Zuletzt {stonksTime} aktualisiert</small>
					</Card.Footer>
				</Card>

				{stonks.length > 0 &&
					<Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 my-4 g-4">
						{stonks.map((item, index) => StonkCard(item, index))}
					</Row>
				}
			</Container>
		</div>
	);
}
