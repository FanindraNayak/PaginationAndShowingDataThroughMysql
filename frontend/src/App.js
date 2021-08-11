import React, { useState, useEffect } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
function App() {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(10);
	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
	const pageNumber = [];
	const indexOfLastPage = Math.ceil(data.length / postPerPage);
	const [searchedData, setSearchedData] = useState([]);
	for (let i = 1; i <= indexOfLastPage; i++) {
		pageNumber.push(i);
	}

	const [name, setName] = useState("");

	useEffect(() => {
		loadData();
	});

	const loadData = async () => {
		const url = `http://localhost:3012/`;
		const response = await axios.get(url);
		if (response) setData(response.data);
	};

	const mappingObject = () => {
		return currentPosts.map((dataThing) => {
			return (
				<tr key={dataThing.Id}>
					<th scope="row">{dataThing.Id}</th>
					<td>{dataThing.User}</td>
					<td>{dataThing.Name}</td>
					<td>{dataThing.Date}</td>
				</tr>
			);
		});
	};

	const paginationData = () => {
		return pageNumber.map((pages) => {
			return (
				<li
					key={pages}
					id={pages}
					style={{
						width:
							(pages >= currentPage && pages <= currentPage + 3) ||
							pages === 1 ||
							pages === indexOfLastPage ||
							(pages >= currentPage - 3 && pages <= currentPage)
								? "max-content"
								: "0%",
					}}
					className={pages === currentPage ? "page-item active" : "page-item"}
				>
					<a
						key={pages}
						className="page-link"
						onClick={() => setCurrentPage(pages)}
						href="#"
					>
						{pages}
					</a>
				</li>
			);
		});
	};

	const handelchange = (e) => {
		setName(e.target.value);
	};

	const onHandelSubmit = (e) => {
		e.preventDefault();
		const searchData = data.filter((e) => e.User === name);
		setSearchedData(searchData);
		setName("");
	};

	const searchedByUserData = () => {
		return searchedData.map((dataGotBySearch) => {
			return (
				<div
					key={dataGotBySearch.Id}
					className="card"
					style={{ width: "18rem", marginRight: 20, marginBottom: 10 }}
				>
					<div className="card-body">
						<h5 className="card-title">{dataGotBySearch.User}</h5>
						<h6 className="card-subtitle mb-2 text-muted">
							{dataGotBySearch.Date}
						</h6>
						<p className="card-text">{dataGotBySearch.Name}</p>
					</div>
				</div>
			);
		});
	};
	return (
		<div className="App">
			<form
				className="input-group mb-3 just "
				style={{ width: 500, marginTop: 20, marginLeft: 50 }}
			>
				<input
					type="text"
					className="form-control"
					placeholder="Recipient's username"
					aria-label="Recipient's username"
					aria-describedby="button-addon2"
					value={name}
					onChange={handelchange}
				/>
				<button
					className="btn btn-outline-secondary"
					type="button"
					id="button-addon2"
					onClick={onHandelSubmit}
				>
					Button
				</button>
			</form>

			<section
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2,1fr)",
					gridGap: 0,
					gridColumnGap: 0,
				}}
			>
				<div
					style={{
						marginLeft: "2%",
						width: "800px",
					}}
				>
					<table
						className="table text-center w-100 justify-content-center"
						style={{
							height: "550px",
							width: "500px",
						}}
					>
						<thead>
							<tr>
								<th scope="col">Id</th>
								<th scope="col">User</th>
								<th scope="col">Name</th>
								<th scope="col">Date</th>
							</tr>
						</thead>
						<tbody>{mappingObject()}</tbody>
					</table>

					<nav aria-label="Page navigation example">
						<ul
							className="pagination justify-content-start"
							style={{
								marginLeft: "30%",
								marginTop: 20,
							}}
						>
							<li className="page-item">
								<a
									onClick={() => setCurrentPage(currentPage - 1)}
									className="page-link"
									href="#"
									aria-label="Previous"
								>
									<span aria-hidden="true">«</span>
								</a>
							</li>
							{paginationData()}
							<li className="page-item">
								<a
									className="page-link"
									onClick={() => setCurrentPage(currentPage + 1)}
									href="#"
									aria-label="Next"
								>
									<span aria-hidden="true">»</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2,1fr)",
						gridTemplateRows: "150px 150px",
						marginLeft: "50px",
						marginTop: 10,
						width: "max-content",
						overflow: "hidden",
					}}
				>
					{searchedData.length === 0 ? (
						<h1>Search Something For It To Appear</h1>
					) : (
						searchedByUserData()
					)}
				</div>
			</section>
		</div>
	);
}

export default App;
