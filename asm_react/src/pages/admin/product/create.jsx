import { Link } from "react-router-dom";

const Addproduct = () => {


    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Thêm sản phẩm</h4>
                    <Link to={'/admin/products'} className="btn btn-primary btn-sm float-right" >
                        <i className="fas fa-arrow-left"></i> Quay lại
                    </Link>
                </div>
                <div className="card-body">
                    <form action="" method="post">
                        <div className="form-group mb-3">
                            <label for="product_name">Tên sản phẩm</label>
                            <input type="text" className="form-control" id="product_name" name="product_name" required />
                        </div>
                        <div className="form-group mb-3">
                            <label for="product_price">Giá sản phẩm</label>
                            <input type="number" className="form-control" id="product_price" name="product_price" required />
                        </div>
                        <div className="form-group mb-3">
                            <label for="product_description">Mô tả sản phẩm</label>
                            <textarea className="form-control" id="product_description" name="product_description" rows="3" required></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label for="product_image">Ảnh sản phẩm</label>
                            <input type="file" className="form-control" id="product_image" name="product_image" required />
                        </div>
                        <div className="text-end mb-3">
                            <button className="btn btn-success">Thêm sản phẩm</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Addproduct;