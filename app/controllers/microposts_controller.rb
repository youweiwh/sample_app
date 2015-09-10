class MicropostsController < ApplicationController
  before_action :signed_in_user,  only: [:create, :destroy]
  before_action :correct_user,    only: :destroy

  def index
    if params[:search]
      @search = Micropost.search do
        fulltext params[:search]
        paginate(:page => params[:page], :per_page => 30)
      end

      @microposts = @search.results
      @count = @search.total
    else
      @microposts = [] # Micropost.paginate(page: params[:page])
      @count = @microposts.count
    end
  end

  def create
    @micropost = current_user.microposts.build(micropost_params)
    if @micropost.save
      flash[:success] = "Micropost created!"
      redirect_to root_url
    else
      @feed_item = []
      render 'static_pages/home'
    end
  end

  def destroy
    @micropost.destroy
    redirect_to root_url
  end

  private

  def micropost_params
    params.require(:micropost).permit(:content)
  end

  def correct_user
    @micropost = current_user.microposts.find_by(id: params[:id])
    redirect_to root_url if @micropost.nil?
  end

end
