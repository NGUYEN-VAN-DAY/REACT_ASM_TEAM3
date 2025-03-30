import { Link } from "react-router-dom";

const AddCate = () => {


    return(
        <>
        
            
        <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Thêm Mới Danh Mục</h3>
                    <Link to="/admin/categories" className="btn btn-success">Quay về</Link>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group mb-3">
                            <label>Tên Danh Mục</label>
                            <input type="text" className="form-control" placeholder="Nhập tên danh mục" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Mô Tả</label>
                            <textarea className="form-control" rows="3" placeholder="Nhập mô tả cho danh mục" defaultValue={""}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Lưu</button>
                    </form>
                </div>
            </div>
            </>
    )
}

export default AddCate;