import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { bindActionCreators } from 'redux';
import getCandidates, { updateTestScore } from "../../actions/actions";
import CandidateTable from '../candidate-table/candidate-table';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import moment from 'moment';
import _ from 'underscore';

const mapStateToProps = function (store) {
	return { candidates: store.candidatesRed.candidates }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getCandidates: getCandidates,
		updateTestScore: updateTestScore
	}, dispatch);
}

class App extends Component {

	constructor(props) {
		super(props);

		const startInterview = (column, scoreValue, id) => {

			let updatedData = this.state.data.map(row => {
				if (row.emailId === id) {
					if (scoreValue === null) {
						row[column.columnType]["startTime"] = moment().format("YYYY-MM-DD HH:MM:ss");
					} else {
						row[column.columnType]["endTime"] = moment().format("YYYY-MM-DD HH:MM:ss");
					}
				}
				return row;
			});

			if (scoreValue !== 0) {
				let temp = {
					cellEdit: {
						dataField: column.columnType + "." + column.columnField,
						rowId: id,
						newValue: scoreValue ? scoreValue : 0
					},
					data: updatedData
				}
				this.handleTableChange("cellEdit", temp);
			}
		}

		const candidateName = (cell, rowData, rowIdx, extraFormatData) => {
			return (<span className='candidateName'>{rowData.name}</span>);
		};

		const columnFormatter = (cell, rowData, rowIdx, extraFormatData) => {
			//selectOptions[cell]
			if (extraFormatData.columnType === "testDetails") {
				switch (extraFormatData.columnField) {
					case "score":
						if (rowData.testDetails.score !== null) {
							return (<span className="score_style">{rowData.testDetails.score}</span>);
						} else {
							return "Enter score";
						}
					case "status":
						if (rowData.testDetails.score === null) {
							return (<span className='na-style'>NA</span>);
						} else if (rowData.testDetails.score < 3) {
							return (<span className='rejected'><i className="fas fa-times-circle"></i> Rejected</span>);
						} else {
							return (<span className='selected'><i className="fas fa-check-circle"></i> Selected</span>);
						}
					default: break;
				};
			}

			if (extraFormatData.columnType === "l1Details") {
				switch (extraFormatData.columnField) {
					case "score":
						if (rowData.testDetails.score >= 3) {
							if (rowData.l1Details.startTime.length === 0) {
								return (
									<button className="btn btn-primary btn-sm"
										onClick={() => { startInterview(extraFormatData, rowData.l1Details.score, rowData.emailId) }}
									>Schedule L1</button>
								);
							} else if (rowData.l1Details.startTime.length !== 0 && rowData.l1Details.endTime.length === 0) {
								return (
									<button className="btn btn-success btn-sm"
										onClick={() => { startInterview(extraFormatData, rowData.l1Details.score, rowData.emailId) }}
									>Finish Interview</button>
								);
							} else {
								return (<span className="score_style">{rowData.l1Details.score}</span>);
							}
						} else {
							return (<span className='na-style'>NA</span>);
						}
					case "status":

						if (rowData.testDetails.score >= 3 && rowData.l1Details.score !== null) {

							if (rowData.l1Details.startTime.length !== 0 && rowData.l1Details.endTime.length === 0) {
								return (
									<span><span className="small">Started at</span><br /> <i className="far fa-clock"></i> {moment(rowData.l1Details.startTime).format("HH:mm:ss")}</span>
								);
							} else if (rowData.l1Details.score >= 3) {
								return (
									<span>
										<span className="small">Selected in </span><br /> <i className="far fa-clock"></i> {timer(rowData.l1Details.startTime, rowData.l1Details.endTime)} mins
                            		</span>
								);
							} else {
								return (<span className='rejected'><i className="fas fa-times-circle"></i> Rejected</span>);
							}
						} else {
							return (<span className='na-style'>NA</span>);
						}
					default: break;
				}

			}

			if (extraFormatData.columnType === "gkDetails") {
				switch (extraFormatData.columnField) {
					case "score":
						if (rowData.l1Details.score >= 3) {
							if (rowData.gkDetails.startTime.length === 0) {
								return (
									<button className="btn btn-primary btn-sm"
										onClick={() => { startInterview(extraFormatData, rowData.gkDetails.score, rowData.emailId) }}
									>Schedule GK</button>
								);
							} else if (rowData.gkDetails.startTime.length !== 0 && rowData.gkDetails.endTime.length === 0) {
								return (
									<button className="btn btn-success btn-sm"
										onClick={() => { startInterview(extraFormatData, rowData.gkDetails.score, rowData.emailId) }}
									>Finish Interview</button>
								);
							} else {
								return (<span className="score_style">{rowData.gkDetails.score}</span>);
							}
						} else {
							return (<span className='na-style'>NA</span>);
						}
					case "status":
						if (rowData.l1Details.score >= 3 && rowData.gkDetails.score !== null) {

							if (rowData.gkDetails.startTime.length !== 0 && rowData.gkDetails.endTime.length === 0) {
								return (
									<span><span className="small">Started at</span><br /> <i className="far fa-clock"></i> {moment(rowData.gkDetails.startTime).format("HH:mm:ss")}</span>
								);
							} else if (rowData.gkDetails.score >= 3) {
								return (
									<span>
										<span className="small">Selected in </span><br /> <i className="far fa-clock"></i> {timer(rowData.gkDetails.startTime, rowData.gkDetails.endTime)} mins
								</span>
								);
							} else {
								return (<span className='rejected'><i className="fas fa-times-circle"></i> Rejected</span>);
							}
						} else {
							return (<span className='na-style'>NA</span>);
						}
					default: break;
				}

			}

			if (extraFormatData.columnType === "finalResult") {
				switch (extraFormatData.columnField) {
					case "status":
						if (rowData.testDetails.score !== null) {
							if (rowData.testDetails.score < 3) {
								//test reject
								return (<span className="score_style">Test Rejected</span>);
							} else {
								//test selected
								if (rowData.l1Details.score !== null) {
									if (rowData.testDetails.score < 3) {
										//l1 reject
										return (<span className="score_style">L1 Rejected</span>);
									} else {
										// l1 selected
										if (rowData.gkDetails.score !== null) {
											if (rowData.gkDetails.score < 3) {
												//gk reject
												return (<span className="score_style">GK Rejected</span>);
											} else if (rowData.gkDetails.score !== null) {
												// gk selected
												return (<span className="score_style">GK Selected</span>);
											}
										}
										return (<span className="score_style">L1 Selected</span>);
									}
								}
								return (<span className="score_style">Test Selected</span>);
							}
						} else {
							return (<span className='score_style na-style'>NA</span>);
						}
					case 'seniority':
						if (!rowData.gkDetails.score || rowData.gkDetails.score < 3) {
							return (<span className='score_style na-style'>NA</span>);
						} else {
							return (<span className='score_style'>{rowData.finalResult.seniority}</span>);
						}
					default: break;
				}
			}
		};

		function timer(startTime, endTime) {
			let start = new moment(startTime);
			let end = new moment();

			if (endTime !== null && endTime.length !== 0) {
				end = new moment(endTime);
			}

			return end.diff(start, "minutes");
		}

		const scoreValidation = (newValue, row, column) => {
			if (isNaN(newValue) || newValue < 1 || newValue > 5) {
				return {
					valid: false,
					message: 'The value should be number and in the range of 1 - 5'
				};
			} else {
				return true;
			}
		}

		this.handleTableChange = this.handleTableChange.bind(this);

		this.columns = [{
			dataField: 'name',
			text: 'Name',
			formatter: candidateName,
			sort: true,
			editable: false,
			filter: textFilter()
		}, {
			dataField: 'experience',
			text: 'Experience',
			sort: true,
			editable: false,
			filter: textFilter()
		}, {
			dataField: 'testDetails.score',
			text: 'Test Score',
			sort: true,
			validator: scoreValidation,
			editCellClasses: (cell, row, rowIndex, colIndex) => {
				return (cell < 1 || cell > 5) ? 'has-error' : 'has-success';
			},
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "testDetails",
				"columnField": "score"
			},
			filter: textFilter()

		}, {
			dataField: 'testDetails.startTime',
			text: 'Test Status',
			sort: true,
			editable: false,
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "testDetails",
				"columnField": "status"
			}
		}, {
			dataField: 'l1Details.score',
			text: 'L1 Score',
			sort: true,
			validator: scoreValidation,
			editable: (content, rowData) => {
				return rowData.testDetails.score >= 3;
			},
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "l1Details",
				"columnField": "score"
			}
		}, {
			dataField: 'l1Details.startTime',
			text: 'L1 Status',
			sort: true,
			editable: false,
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "l1Details",
				"columnField": "status"
			}
		}, {
			dataField: 'gkDetails.score',
			text: 'GK Score',
			sort: true,
			validator: scoreValidation,
			editable: (content, rowData, rowIndex, columnIndex) => {
				return rowData.l1Details.score !== "NA" && rowData.testDetails.score >= 3
					&& rowData.l1Details.score >= 3;
			},
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "gkDetails",
				"columnField": "score"
			}
		}, {
			dataField: 'gkDetails.startTime',
			text: 'GK Status',
			sort: true,
			editable: false,
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "gkDetails",
				"columnField": "status"
			}
		}, {
			dataField: 'finalResult.status',
			text: 'Final Status',
			sort: true,
			editable: false,
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "finalResult",
				"columnField": "status"
			}
		}, {
			dataField: 'finalResult.seniority',
			text: 'Seniority',
			sort: true,
			editable: (content, rowData) => {
				return rowData.gkDetails.score >= 3;
			},
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "finalResult",
				"columnField": "seniority"
			}
		}];

		this.defaultSorted = [{
			dataField: 'name',
			order: 'asc'
		}];

		//Dropdown pagination option to show no of records per page 
		const sizePerPageListOptions = [{ text: '10', value: 10 },
		{ text: '20', value: 20 },
		{ text: '30', value: 30 },
		{ text: '40', value: 40 },
		{ text: '50', value: 50 }]
		//pagination constant options...
		this.paginationOptions = {
			paginationSize: 10,
			pageStartIndex: 1,
			firstPageText: 'First',
			prePageText: 'Back',
			nextPageText: '>',
			lastPageText: '<',
			sizePerPageList: sizePerPageListOptions
		}

		this.state = {
			loading: true,
			mobile: false
		};

		this.noDataText = () => {
			if (!this.state.loading && this.state.length === 0) {
				return (<div>sorry no data </div>);
			}
		}
	}

	handleTableChange(eventType, { cellEdit, data }) {

		if (eventType === 'cellEdit') {
			this.props.updateTestScore({
				cellEdit: cellEdit,
				data: data
			});
		}
	}

	componentDidMount() {
		this.props.getCandidates();
		_.debounce(window.addEventListener("resize", this.resize.bind(this)), 1000);
		this.resize();
	}

	resize() {
		this.setState({ mobile: window.innerWidth <= 1024 });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.candidates,
			loading: false
		});
	}

	render() {
		return (

			<div className="container main">
				<div className="row">
					<div className="col-md-12">
						<h1 className="heading">Interview Scheduler</h1>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<CandidateTable
							columns={this.columns}
							data={this.state.data}
							keyField='emailId'
							loading={this.state.loading}
							onTableChange={this.handleTableChange}
							defaultSorted={this.defaultSorted}
							noDataIndication={() => {
								if (!this.state.loading && this.state.data.length === 0) {
									return (<div className="noData">Sorry no Data</div>);
								}
							}}
							mobile={this.state.mobile}
							paginationOptions={this.paginationOptions}

							filter={filterFactory()}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
