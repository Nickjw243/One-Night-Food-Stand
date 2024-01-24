"""empty message

Revision ID: 65af2b32cbd1
Revises: 41e837274a84
Create Date: 2024-01-24 11:52:48.572654

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '65af2b32cbd1'
down_revision = '41e837274a84'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('occasion', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('weather', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('protein', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('difficulty', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.drop_column('difficulty')
        batch_op.drop_column('protein')
        batch_op.drop_column('weather')
        batch_op.drop_column('occasion')

    # ### end Alembic commands ###
