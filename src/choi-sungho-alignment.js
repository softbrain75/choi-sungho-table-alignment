/**
 * Choi Sungho Table Alignment Method
 * 최성호 방식 테이블 정렬 라이브러리
 *
 * 가장 긴 텍스트를 기준점으로 하여 모든 텍스트를 정렬하는 혁신적인 방법
 *
 * @author Choi Sungho
 * @version 1.0.0
 * @license MIT
 */

class ChoiSunghoAlignment {
    constructor(options = {}) {
        this.options = {
            leftAlignRatio: options.leftAlignRatio || 0.1, // 좌측 정렬 시 기준점 (10%)
            rightAlignRatio: options.rightAlignRatio || 0.5, // 우측 정렬 시 기준점 (50% - 중앙)
            centerAlignRatio: options.centerAlignRatio || 0.5, // 센터 정렬 시 기준점 (50%)
            padding: options.padding || 20, // 여유 패딩
            autoResize: options.autoResize !== false, // 자동 리사이즈 (기본값: true)
            ...options
        };
    }

    /**
     * 테이블에 최성호 방식 정렬 적용
     * @param {string|HTMLElement} tableSelector - 테이블 선택자 또는 엘리먼트
     * @param {Object} columnConfig - 컬럼별 설정
     */
    applyAlignment(tableSelector, columnConfig = {}) {
        const table = typeof tableSelector === 'string'
            ? document.querySelector(tableSelector)
            : tableSelector;

        if (!table) {
            console.error('Table not found:', tableSelector);
            return;
        }

        this.processTable(table, columnConfig);

        // 자동 리사이즈 설정
        if (this.options.autoResize) {
            window.addEventListener('resize', () => {
                this.processTable(table, columnConfig);
            });
        }
    }

    /**
     * 테이블 처리 메인 함수
     * @param {HTMLElement} table
     * @param {Object} columnConfig
     */
    processTable(table, columnConfig) {
        const rows = table.querySelectorAll('tbody tr');
        const headers = table.querySelectorAll('thead th');
        const numColumns = headers.length;

        // 1. 컬럼 너비 자동 배분
        this.autoResizeColumns(table, numColumns);

        // 2. 각 컬럼별 정렬 적용
        for (let colIndex = 0; colIndex < numColumns; colIndex++) {
            const config = columnConfig[colIndex] || {};
            this.alignColumn(table, colIndex, config);
        }
    }

    /**
     * 컬럼 너비 자동 배분 (콘텐츠 기반)
     * @param {HTMLElement} table
     * @param {number} numColumns
     */
    autoResizeColumns(table, numColumns) {
        const columnWidths = [];
        const rows = table.querySelectorAll('tbody tr');

        for (let colIndex = 0; colIndex < numColumns; colIndex++) {
            let maxWidth = 0;
            let maxText = '';

            // 헤더 텍스트 확인
            const headerCell = table.querySelector(`thead th:nth-child(${colIndex + 1})`);
            if (headerCell) {
                const headerText = headerCell.textContent.trim();
                if (headerText.length > maxText.length) {
                    maxText = headerText;
                }
            }

            // 바디 셀 중 가장 긴 텍스트 찾기
            rows.forEach(row => {
                const cell = row.cells[colIndex];
                if (cell) {
                    const cellText = cell.textContent.trim();
                    if (cellText.length > maxText.length) {
                        maxText = cellText;
                    }
                }
            });

            // 텍스트 너비 측정
            if (maxText) {
                maxWidth = this.measureTextWidth(maxText, table) + this.options.padding;
            }

            columnWidths.push(maxWidth);
        }

        // 비율 계산하여 컬럼 너비 설정
        const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);
        const headers = table.querySelectorAll('thead th');

        headers.forEach((header, index) => {
            if (totalWidth > 0) {
                const percentage = (columnWidths[index] / totalWidth) * 100;
                header.style.width = percentage + '%';
            }
        });

        table.style.tableLayout = 'fixed';
    }

    /**
     * 개별 컬럼 정렬 적용
     * @param {HTMLElement} table
     * @param {number} colIndex
     * @param {Object} config
     */
    alignColumn(table, colIndex, config) {
        const rows = table.querySelectorAll('tbody tr');
        const alignType = config.align || 'left'; // 'left', 'right', 'center'

        // 가장 긴 텍스트 찾기
        let longestText = '';
        let longestCell = null;

        rows.forEach(row => {
            const cell = row.cells[colIndex];
            if (cell) {
                const cellText = cell.textContent.trim();
                if (cellText.length > longestText.length) {
                    longestText = cellText;
                    longestCell = cell;
                }
            }
        });

        if (!longestCell) return;

        // 셀 너비와 텍스트 너비 측정
        const cellWidth = longestCell.offsetWidth;
        const textWidth = this.measureTextWidth(longestText, table);

        // 정렬 타입에 따른 패딩 계산
        let padding = 0;
        let textAlign = alignType;
        let paddingProperty = '';

        switch (alignType) {
            case 'left':
                padding = (cellWidth * this.options.leftAlignRatio);
                paddingProperty = 'paddingLeft';
                textAlign = 'left';
                break;
            case 'right':
                padding = (cellWidth * this.options.rightAlignRatio) - (textWidth / 2);
                paddingProperty = 'paddingRight';
                break;
            case 'center':
                padding = (cellWidth * this.options.centerAlignRatio) - (textWidth / 2);
                paddingProperty = 'paddingLeft';
                textAlign = 'center';
                break;
        }

        // 모든 셀에 동일한 패딩 적용
        rows.forEach(row => {
            const cell = row.cells[colIndex];
            if (cell) {
                // 기존 패딩 리셋
                cell.style.paddingLeft = '';
                cell.style.paddingRight = '';

                cell.style.textAlign = textAlign;
                cell.style[paddingProperty] = Math.max(0, padding) + 'px';
            }
        });
    }

    /**
     * 텍스트 너비 측정
     * @param {string} text
     * @param {HTMLElement} referenceElement
     * @returns {number}
     */
    measureTextWidth(text, referenceElement) {
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.font = window.getComputedStyle(referenceElement).font;
        tempSpan.textContent = text;
        document.body.appendChild(tempSpan);
        const width = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);
        return width;
    }

    /**
     * 정렬 제거
     * @param {string|HTMLElement} tableSelector
     */
    removeAlignment(tableSelector) {
        const table = typeof tableSelector === 'string'
            ? document.querySelector(tableSelector)
            : tableSelector;

        if (!table) return;

        const cells = table.querySelectorAll('td, th');
        cells.forEach(cell => {
            cell.style.textAlign = '';
            cell.style.paddingLeft = '';
            cell.style.paddingRight = '';
            cell.style.width = '';
        });

        table.style.tableLayout = '';
    }
}

// 전역 함수로도 사용 가능
window.ChoiSunghoAlignment = ChoiSunghoAlignment;

// CommonJS/ES6 모듈 지원
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChoiSunghoAlignment;
}

if (typeof exports !== 'undefined') {
    exports.ChoiSunghoAlignment = ChoiSunghoAlignment;
}