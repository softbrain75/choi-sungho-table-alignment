# 🚀 Choi Sungho Table Alignment

> **최성호 방식** - 혁신적인 테이블 정렬 방법

가장 긴 텍스트를 기준점으로 하여 모든 텍스트를 정렬하는 완전히 새로운 테이블 정렬 방식입니다.

## ✨ 특징

- **동적 기준점 설정**: 가장 긴 콘텐츠를 자동으로 찾아 기준점으로 설정
- **시각적 일관성**: 모든 텍스트가 하나의 기준선으로 정렬되어 깔끔한 시각적 효과
- **반응형 적응**: 테이블 크기 변경 시 자동 재계산 및 재정렬
- **컬럼별 최적화**: 각 컬럼의 콘텐츠 특성에 맞는 개별 기준점 설정
- **콘텐츠 기반 너비**: 실제 콘텐츠 길이에 따른 최적 컬럼 너비 자동 배분

## 🎯 기존 방식과의 차이점

### 기존 방식 (Traditional)
```
특약명                    │  금액
짧은텍스트               │   123원
매우긴텍스트입니다        │ 45,678원
중간길이텍스트           │  9,000원
```

### 최성호 방식 (Choi Sungho Method)
```
특약명                    │    금액
    짧은텍스트           │   123원
    매우긴텍스트입니다    │ 45,678원
    중간길이텍스트        │  9,000원
```

가장 긴 텍스트를 기준으로 모든 텍스트가 일관된 기준점에서 정렬됩니다.

## 📦 설치

### CDN 사용
```html
<script src="https://unpkg.com/choi-sungho-table-alignment/src/choi-sungho-alignment.js"></script>
```

### npm 사용
```bash
npm install choi-sungho-table-alignment
```

### 직접 다운로드
```html
<script src="path/to/choi-sungho-alignment.js"></script>
```

## 🚀 사용법

### 기본 사용법

```javascript
// 라이브러리 초기화
const alignment = new ChoiSunghoAlignment();

// 테이블에 적용
alignment.applyAlignment('#myTable', {
    0: { align: 'left' },   // 첫 번째 컬럼: 좌측 정렬
    1: { align: 'right' },  // 두 번째 컬럼: 우측 정렬
    2: { align: 'center' }  // 세 번째 컬럼: 센터 정렬
});
```

### 옵션 설정

```javascript
const alignment = new ChoiSunghoAlignment({
    leftAlignRatio: 0.1,    // 좌측 정렬 시 기준점 (10%)
    rightAlignRatio: 0.5,   // 우측 정렬 시 기준점 (50% - 중앙)
    centerAlignRatio: 0.5,  // 센터 정렬 시 기준점 (50%)
    padding: 20,            // 여유 패딩 (px)
    autoResize: true        // 자동 리사이즈 활성화
});
```

### HTML 예제

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
    </style>
</head>
<body>
    <table id="example-table">
        <thead>
            <tr>
                <th>상품명</th>
                <th>금액</th>
                <th>기간</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>간단한상품명</td>
                <td>1,000원</td>
                <td>1년</td>
            </tr>
            <tr>
                <td>매우길고복잡한상품명입니다</td>
                <td>999,999원</td>
                <td>10년</td>
            </tr>
            <tr>
                <td>중간길이상품명</td>
                <td>50,000원</td>
                <td>5년</td>
            </tr>
        </tbody>
    </table>

    <script src="choi-sungho-alignment.js"></script>
    <script>
        const alignment = new ChoiSunghoAlignment();

        alignment.applyAlignment('#example-table', {
            0: { align: 'left' },   // 상품명: 좌측 정렬
            1: { align: 'right' },  // 금액: 우측 정렬
            2: { align: 'center' }  // 기간: 센터 정렬
        });
    </script>
</body>
</html>
```

## 🎮 API 참조

### ChoiSunghoAlignment 클래스

#### 생성자
```javascript
new ChoiSunghoAlignment(options)
```

**옵션:**
- `leftAlignRatio` (number): 좌측 정렬 기준점 비율 (기본값: 0.1)
- `rightAlignRatio` (number): 우측 정렬 기준점 비율 (기본값: 0.5)
- `centerAlignRatio` (number): 센터 정렬 기준점 비율 (기본값: 0.5)
- `padding` (number): 여유 패딩 픽셀 (기본값: 20)
- `autoResize` (boolean): 자동 리사이즈 활성화 (기본값: true)

#### 메서드

##### applyAlignment(tableSelector, columnConfig)
테이블에 최성호 방식 정렬을 적용합니다.

**매개변수:**
- `tableSelector` (string|HTMLElement): 테이블 선택자 또는 엘리먼트
- `columnConfig` (Object): 컬럼별 설정 객체

**컬럼 설정 예시:**
```javascript
{
    0: { align: 'left' },   // 첫 번째 컬럼
    1: { align: 'right' },  // 두 번째 컬럼
    2: { align: 'center' }  // 세 번째 컬럼
}
```

##### removeAlignment(tableSelector)
적용된 정렬을 제거하고 기본 상태로 되돌립니다.

**매개변수:**
- `tableSelector` (string|HTMLElement): 테이블 선택자 또는 엘리먼트

## 🌐 브라우저 호환성

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- IE 11+ (부분 지원)

## 📋 라이선스

MIT License - 자유롭게 사용하세요!

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 지원

- 이슈 리포트: [GitHub Issues](https://github.com/choisungho/choi-sungho-table-alignment/issues)
- 문의사항: [이메일](mailto:your.email@example.com)

## 🎉 데모

라이브 데모를 확인하세요: [Demo Page](https://choisungho.github.io/choi-sungho-table-alignment/demo/)

---

**Made with ❤️ by Choi Sungho**

> 더 나은 테이블 경험을 위한 혁신적인 솔루션