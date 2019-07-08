import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';


import './PdfViewerStyles.css'



export default class PdfViewer extends Component {
  constructor(props){
    super(props)
    this.state = {
      numPages: null,
      pageNumber: 1,
      scale: 1.0
    }
  }

  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  changePage = offset => this.setState(prevState => ({
    pageNumber: prevState.pageNumber + offset,
  }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  onPageLoad(page, parent){
    const parentDiv = document.querySelector('#pdfYucatana')
    let pageScale = parentDiv.clientWidth / page.originalWidth
    if(parent.scale !== pageScale){
      parent.setState({
        scale: pageScale
      })
    }
  }

  render() {
    const { numPages, pageNumber } = this.state;

    return (
      <div>
        <React.Fragment>
          <div id='pdfYucatana' className="pdf-doc">
            <Document
              file={this.props.file}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} scale={this.state.scale}
              onLoadSuccess={(page) => {
                this.onPageLoad(page, this)
              }} />
            </Document>
          </div>
          <div className="pdf-pie">
            <p>
              Pag. {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
            </p>
            <div className="pdf-pie-buttons">
              <button className="pretty-button previous"
                type="button"
                disabled={pageNumber <= 1}
                onClick={this.previousPage}
              >
                &#8249;
              </button>
              <button className="pretty-button next"
                type="button"
                disabled={pageNumber >= numPages}
                onClick={this.nextPage}
              >
                &#8250;
              </button>
            </div>
            <h1>Link de descarga:
                <a className="pdf-descargar" rel="noopener noreferrer" href={this.props.file} target="_blank">Descargar</a>
            </h1>
          </div>
        </React.Fragment>
      </div>
    );
  }
}